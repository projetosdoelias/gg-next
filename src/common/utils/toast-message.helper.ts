import { ToastPosition, toast } from "react-toastify";

export function showSuccessToast(msg: string, autoClose: number = 4000, position: ToastPosition = "top-right") {
  toast.success(msg, {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}

export function showErrorToast(msg: string, autoClose: number = 4000, position: ToastPosition = "top-center") {
  toast.error(msg, {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}


export function showWarningToast(msg: string, autoClose: number = 4000, position: ToastPosition = "top-right") {
  toast.warn(msg, {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
