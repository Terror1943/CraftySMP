import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  updateDoc 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { DeliveryOrder, RankApplication, Product } from '../types';

const ORDERS_COLLECTION = 'orders';
const APPLICATIONS_COLLECTION = 'rankApplications';
const PRODUCTS_COLLECTION = 'products';

/**
 * Creates an order in Firestore
 */
export async function saveOrderToFirestore(order: DeliveryOrder): Promise<void> {
  const docRef = doc(db, ORDERS_COLLECTION, order.id);
  try {
    await setDoc(docRef, {
      ...order,
      createdAt: order.createdAt || new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${ORDERS_COLLECTION}/${order.id}`);
  }
}

/**
 * Subscribes to orders in real-time. Admins get all orders; players get their own.
 */
export function subscribeToOrders(
  userId: string | null,
  isAdmin: boolean,
  callback: (orders: DeliveryOrder[]) => void
): () => void {
  const colRef = collection(db, ORDERS_COLLECTION);
  
  const q = isAdmin
    ? query(colRef, orderBy('createdAt', 'desc'))
    : userId
    ? query(colRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))
    : null;

  if (!q) {
    callback([]);
    return () => {};
  }

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((docSnap) => ({
        ...docSnap.data(),
        id: docSnap.id,
      })) as DeliveryOrder[];
      callback(orders);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, ORDERS_COLLECTION);
    }
  );

  return unsubscribe;
}

/**
 * Updates order delivery status in Firestore
 */
export async function updateOrderDeliveryStatus(
  orderId: string,
  deliveryStatus: 'queued' | 'delivering' | 'delivered' | 'failed'
): Promise<void> {
  const docRef = doc(db, ORDERS_COLLECTION, orderId);
  try {
    await updateDoc(docRef, { deliveryStatus });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${ORDERS_COLLECTION}/${orderId}`);
  }
}

/**
 * Submits rank application to Firestore
 */
export async function saveRankApplicationToFirestore(app: RankApplication): Promise<void> {
  const docRef = doc(db, APPLICATIONS_COLLECTION, app.id);
  try {
    await setDoc(docRef, {
      ...app,
      createdAt: app.createdAt || new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${APPLICATIONS_COLLECTION}/${app.id}`);
  }
}

/**
 * Subscribes to rank applications in real-time
 */
export function subscribeToRankApplications(
  userId: string | null,
  isAdmin: boolean,
  callback: (apps: RankApplication[]) => void
): () => void {
  const colRef = collection(db, APPLICATIONS_COLLECTION);

  const q = isAdmin
    ? query(colRef, orderBy('createdAt', 'desc'))
    : userId
    ? query(colRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))
    : null;

  if (!q) {
    callback([]);
    return () => {};
  }

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const apps = snapshot.docs.map((docSnap) => ({
        ...docSnap.data(),
        id: docSnap.id,
      })) as RankApplication[];
      callback(apps);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, APPLICATIONS_COLLECTION);
    }
  );

  return unsubscribe;
}

/**
 * Updates rank application review status
 */
export async function updateRankApplicationStatus(
  appId: string,
  status: 'approved' | 'rejected',
  adminNotes?: string
): Promise<void> {
  const docRef = doc(db, APPLICATIONS_COLLECTION, appId);
  try {
    await updateDoc(docRef, {
      status,
      ...(adminNotes ? { adminNotes } : {}),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${APPLICATIONS_COLLECTION}/${appId}`);
  }
}
