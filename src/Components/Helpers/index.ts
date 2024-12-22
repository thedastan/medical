import API from "../../Api";
import { ActionGroupPut } from "../Interface/redux-image/action/Action";
import { IInfoList } from "../Interface/redux-image/types/Types";
import {
  ActionError,
  ActionErrorMessenger,
} from "../Ui/popups/redux/action/Action";

interface IHandlePutFilesProps {
  text: string;
  filePdf: any;
  idFile: string;
  cropData: string;
  group: IInfoList;
  ActionAllGroups: () => void;
  setText: (value: string) => void;
  setLoader: (value: boolean) => void;
  setCropData: (value: string) => void;
  setImageFile: (value: string) => void;
  setPdfIncludes: (value: boolean) => void;
}

interface IHandlePutFileProps {
  text: string;
  idFile: string;
  group: IInfoList;
  ActionAllGroups: () => void;
  setText: (value: string) => void;
  setCropData: (value: string) => void;
  setImageFile: (value: string) => void;
  setPdfIncludes: (value: boolean) => void;
}

export const onChangeImage = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setImageFile: (value: string) => void
) => {
  e.preventDefault();

  let files: FileList | null | any;
  files = e.target.files;

  try {
    const reader = await new FileReader();
    reader.onload = () => {
      setImageFile(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  } catch (e) {
    ActionError(true);
    ActionErrorMessenger("fileABig");
  }
};

export function dataURLtoFile(dataurl: any, filename: string) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export const getAccessToken = () => {
  return localStorage.getItem("accessToken" as any);
};

export const handlePutFiles = async ({
  text,
  group,
  idFile,
  filePdf,
  cropData,
  setText,
  setLoader,
  setCropData,
  setImageFile,
  setPdfIncludes,
  ActionAllGroups,
}: IHandlePutFilesProps) => {
  const image = cropData
    ? dataURLtoFile(cropData, `${Math.floor(Math.random() * 100000)}.png`)
    : filePdf;
  if (cropData || filePdf) {
    const formData = new FormData();
    formData.append("file", image);

    setLoader(true);
    await API.post("users/upload/", formData)
      .then(({ data }) => {
        if (data) {
          ActionGroupPut(
            idFile,
            group.id,
            {
              file_url: data.path || group.file_url,
              text: text || group.text,
              id: group.id,
              created_date: group.created_date,
            },
            setText
          );
          setCropData("");
          setImageFile("");
          setLoader(false);
          ActionAllGroups();
          setPdfIncludes(false);
        }
      })
      .catch((e) => {
        setText("");
        setLoader(false);
        ActionError(true);
        ActionAllGroups();
        setPdfIncludes(false);
        ActionErrorMessenger(e);
      });
  } else {
    ActionGroupPut(
      idFile,
      group.id,
      {
        file_url: group.file_url,
        text: text || group.text,
        id: group.id,
        created_date: group.created_date,
      },
      setText
    );
    ActionAllGroups();
  }
};

export const handlePutFile = ({
  ActionAllGroups,
  group,
  text,
  setText,
  setPdfIncludes,
  setCropData,
  setImageFile,
  idFile,
}: IHandlePutFileProps) => {
  ActionGroupPut(
    idFile,
    group.id,
    {
      file_url: group.file_url,
      text: text || group.text,
      id: group.id,
      created_date: group.created_date,
    },
    setText
  );
  ActionAllGroups();
  setCropData("");
  setImageFile("");
  // setDeleteCenceled(false);
  setPdfIncludes(false);
};
