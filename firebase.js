//npm install firebase

//--------------------------------------------------------
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Firebase config dosyanızı ekleyin
import firebaseConfig from "./firebaseConfig";

// Firebase'i başlatın
firebase.initializeApp(firebaseConfig);

// Gerekirse diğer Firebase servislerini de etkinleştirin
const auth = firebase.auth();
const database = firebase.database();

export { auth, database };

//--------------------------------------------
import { auth, database } from "./firebase";

// Kullanıcı oluşturma fonksiyonu
const createUser = async (email, password) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Kullanıcı oluşturma hatası:", error);
    throw error;
  }
};

// Kullanıcının listesini veritabanına ekleme
const addListForUser = (userId, listData) => {
  database.ref(`users/${userId}/lists`).push(listData);
};

// Kullanıcının listelerini almak
const getListsForUser = (userId) => {
  return database
    .ref(`users/${userId}/lists`)
    .once("value")
    .then((snapshot) => snapshot.val());
};

// Kullanıcı girişi yapma
const signInUser = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Kullanıcı girişi hatası:", error);
    throw error;
  }
};

// Kullanıcı çıkışı yapma
const signOutUser = () => {
  return auth.signOut();
};

export { createUser, addListForUser, getListsForUser, signInUser, signOutUser };

//------------------------------------------------------------
/*import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig"; // Firebase config dosyanızı ekleyin

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export default auth;
const signInUser = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Kullanıcı girişi hatası:", error);
    throw error;
  }
};

export { signInUser };

const signOutUser = () => {
  return auth.signOut();
};

export { signOutUser };*/

//----------------------------------------------------
const addListToUser = async (userId, listName) => {
  try {
    // Kullanıcının koleksiyonunu referans al
    const userRef = firestore.collection("users").doc(userId);

    // Kullanıcının koleksiyonuna yeni bir belge ekle
    await userRef.collection("lists").add({
      name: listName,
      items: [],
    });

    console.log("Liste başarıyla eklendi.");
  } catch (error) {
    console.error("Liste eklerken bir hata oluştu:", error);
    throw error;
  }
};

const getUserLists = async (userId) => {
  try {
    // Kullanıcının koleksiyonunu referans al
    const userRef = firestore.collection("users").doc(userId);

    // Kullanıcının koleksiyonundaki tüm belgeleri getir
    const listsSnapshot = await userRef.collection("lists").get();

    const lists = listsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return lists;
  } catch (error) {
    console.error("Listeleri getirirken bir hata oluştu:", error);
    throw error;
  }
};

const deleteListFromUser = async (userId, listId) => {
  try {
    // Kullanıcının koleksiyonunu referans al
    const userRef = firestore.collection("users").doc(userId);

    // Kullanıcının koleksiyonundan belgeyi sil
    await userRef.collection("lists").doc(listId).delete();

    console.log("Liste başarıyla silindi.");
  } catch (error) {
    console.error("Liste silerken bir hata oluştu:", error);
    throw error;
  }
};
