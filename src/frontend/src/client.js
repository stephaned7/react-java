const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  return Promise.reject(error);
};

export const getAllStudents = () =>
  fetch("java-react-api/students").then(checkStatus);
