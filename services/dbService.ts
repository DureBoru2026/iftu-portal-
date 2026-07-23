
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  getDocFromServer
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { db, auth } from './firebase';
import { User, ExamResult, Course, Exam, News } from '../types';

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string; }[];
  }
}

const handleFirestoreError = (error: any, operationType: FirestoreErrorInfo['operationType'], path: string | null = null) => {
  if (error.code === 'permission-denied') {
    const errorInfo: FirestoreErrorInfo = {
      error: error.message,
      operationType,
      path,
      authInfo: {
        userId: auth.currentUser?.uid || 'anonymous',
        email: auth.currentUser?.email || '',
        emailVerified: auth.currentUser?.emailVerified || false,
        isAnonymous: auth.currentUser?.isAnonymous || true,
        providerInfo: auth.currentUser?.providerData.map(p => ({
          providerId: p.providerId,
          displayName: p.displayName || '',
          email: p.email || ''
        })) || []
      }
    };
    throw new Error(JSON.stringify(errorInfo));
  }
  throw error;
};

// CRITICAL CONSTRAINT: Test connection on boot
const testConnection = async () => {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    if(error.message?.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
};
testConnection();

export const dbService = {
  // AUTH: SIGN UP
  async signUp(email: string, password: string, userData: Partial<User>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const authUser = userCredential.user;

      if (authUser) {
        await updateProfile(authUser, { displayName: userData.name });
        
        const fullUser: User = {
          id: authUser.uid,
          name: userData.name || '',
          email: email,
          role: userData.role || 'student',
          points: userData.points || 0,
          status: 'active',
          joinedDate: new Date().toISOString(),
          preferredLanguage: userData.preferredLanguage || 'en',
          badges: [],
          completedLessons: [],
          completedExams: [],
          completedCourses: [],
          certificatesPaid: [],
          ...userData
        };

        await this.syncUser(fullUser);
        return { user: authUser, session: { access_token: 'firebase' }, error: null };
      }
      return { user: null, session: null, error: new Error("User creation failed") };
    } catch (err: any) {
      console.error("Registration Error:", err.message);
      return { user: null, session: null, error: err };
    }
  },

  // AUTH: SIGN IN
  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error: any) {
      return { user: null, error };
    }
  },

  // AUTH: SIGN OUT
  async signOut() {
    return await signOut(auth);
  },

  // FETCH USER PROFILE
  async fetchUserProfile(userId: string) {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() as User : null;
    } catch (error) {
      return handleFirestoreError(error, 'get', `users/${userId}`);
    }
  },

  // SYNC USER DATA
  async syncUser(user: User) {
    try {
      const docRef = doc(db, 'users', user.id);
      await setDoc(docRef, { ...user, lastSync: new Date().toISOString() }, { merge: true });
    } catch (error) {
      return handleFirestoreError(error, 'write', `users/${user.id}`);
    }
  },

  // DELETE USER
  async deleteUser(id: string) {
    try {
      await deleteDoc(doc(db, 'users', id));
    } catch (error) {
      return handleFirestoreError(error, 'delete', `users/${id}`);
    }
  },

  // FETCH USERS (LEADERBOARD)
  async fetchTopStudents() {
    try {
      const q = query(collection(db, 'users'), where('role', '==', 'student'), orderBy('points', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as User);
    } catch (error) {
      console.warn("Leaderboard Fetch Error:", error);
      return [];
    }
  },

  // SYNC EXAM DATA
  async syncExam(exam: Exam) {
    try {
      const docRef = doc(db, 'exams', exam.id);
      await setDoc(docRef, exam, { merge: true });
    } catch (error) {
      return handleFirestoreError(error, 'write', `exams/${exam.id}`);
    }
  },

  // FETCH EXAMS
  async fetchExams() {
    try {
      const q = query(collection(db, 'exams'), where('status', '==', 'published'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as Exam);
    } catch (error) {
      return [];
    }
  },

  // FETCH COURSES
  async fetchCourses() {
    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      return querySnapshot.docs.map(doc => doc.data() as Course);
    } catch (error) {
      return [];
    }
  },

  // FETCH NEWS
  async fetchNews() {
    try {
      const q = query(collection(db, 'news'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as News);
    } catch (error) {
      return [];
    }
  },

  // SYNC EXAM RESULTS
  async saveExamResult(result: ExamResult) {
    try {
      const docRef = doc(collection(db, 'exam_results'));
      await setDoc(docRef, { ...result, resultId: docRef.id });
    } catch (error) {
      return handleFirestoreError(error, 'create', 'exam_results');
    }
  },

  // SYNC COURSE DATA
  async syncCourse(course: Course) {
    try {
      const docRef = doc(db, 'courses', course.id);
      await setDoc(docRef, course, { merge: true });
    } catch (error) {
      return handleFirestoreError(error, 'write', `courses/${course.id}`);
    }
  },

  // DELETE COURSE
  async deleteCourse(id: string) {
    try {
      await deleteDoc(doc(db, 'courses', id));
    } catch (error) {
      return handleFirestoreError(error, 'delete', `courses/${id}`);
    }
  },

  // SYNC NEWS DATA
  async syncNews(news: News) {
    try {
      const docRef = doc(db, 'news', news.id);
      await setDoc(docRef, news, { merge: true });
    } catch (error) {
      return handleFirestoreError(error, 'write', `news/${news.id}`);
    }
  },

  // DELETE NEWS
  async deleteNews(id: string) {
    try {
      await deleteDoc(doc(db, 'news', id));
    } catch (error) {
      return handleFirestoreError(error, 'delete', `news/${id}`);
    }
  },

  // FETCH PERFORMANCE HISTORY
  async fetchResults(userId: string) {
    try {
      const q = query(collection(db, 'exam_results'), where('studentId', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as ExamResult);
    } catch (error) {
      return [];
    }
  },

  // FETCH ALL RESULTS (Admin)
  async fetchAllResults() {
    try {
      const q = query(collection(db, 'exam_results'), orderBy('completedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as ExamResult);
    } catch (error) {
      return [];
    }
  }
};
