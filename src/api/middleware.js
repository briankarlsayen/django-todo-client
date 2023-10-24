import Swal from 'sweetalert2';

// Toast
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
});

export const toastAlert = (params) => {
  Toast.fire({
    icon: params.icon,
    title: params.message,
    timer: 2000,
  });
};

export const toastAlertwithMessage = (params) => {
  Toast.fire({
    icon: params.icon,
    title: params.title,
    text: params.message,
    timer: 1500,
  });
};

export const customToastAlert = (params) => {
  Toast.fire({
    icon: params.icon,
    title: params.message,
    timer: params.timer,
  });
};

export const confirmationModal = (action) => {
  let message = {
    title: '',
    icon: '',
    message: '',
    confirmButton: '',
    cancelButton: '',
  };

  if (action === 'status') {
    message.message = 'Do you want to change status?';
    message.confirmButton = 'Yes, Update';
    message.cancelButton = 'Cancel';
  }

  if (action === 'status') {
    message.title = 'Warning';
    message.icon = 'warning';
    message.message = 'Do you want to change status?';
    message.confirmButton = 'Yes, Update';
    message.cancelButton = 'Cancel';
  }

  if (action === 'update') {
    message.title = 'Warning';
    message.icon = 'warning';
    message.message = 'Do you want to update this?';
    message.confirmButton = 'Yes, Update';
    message.cancelButton = 'Cancel';
  }

  if (action === 'archive') {
    message.title = 'Archive';
    message.icon = 'error';
    message.message = 'Do you want to archive this?';
    message.confirmButton = 'Archive';
    message.cancelButton = 'Cancel';
  }

  return Swal.fire({
    icon: message.icon,
    title: message.title,
    width: 400,
    text: message.message,
    showCancelButton: true,
    confirmButtonText: message.confirmButton,
    denyButtonText: message.cancelButton,
  }).then(async (result) => {
    if (result.isConfirmed) {
      return true;
    } else if (result.isDenied) {
      return false;
    }
    return false;
  });
};

export const statusAlertModal = (params) => {
  return Swal.fire({
    icon: params.icon,
    title: params.title,
    text: params.text,
    confirmButtonText: params.confirmButton,
  });
};
