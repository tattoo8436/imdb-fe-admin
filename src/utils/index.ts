import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDB } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

export const getCurrentAccount: any = () => {
  return JSON.parse(localStorage.getItem("account") ?? "{}");
};

export const validateFileSize = (file: File | null) => {
  if (file === null) {
    return true;
  }
  if (file.size > 1024 * 1024 * 10) {
    return false;
  }
  return true;
};

export const filterOption = (input: any, option: any) =>
  option?.label
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .includes(
      input
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
    );

export const uploadImage = async (image: any) => {
  if (!image) {
    return "";
  }
  const imageRef = ref(imageDB, `files/${uuidv4()}`);
  const snapshot = await uploadBytes(imageRef, image);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
