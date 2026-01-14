// import axios from 'axios';

// // const baseUrl = 'http://localhost:8080';

// const getAllToDo = (setToDo) => {
//     axios.get(`/api`).then(({ data }) => {
//         console.log('data ---> ', data);
//         setToDo(data);
//     });
// };

// const addToDo = (text, setText, setToDo) => {
//     axios
//         .post(`/api/save`, { text })
//         .then((data) => {
//             console.log(data);
//             setText('');
//             getAllToDo(setToDo);
//         })
//         .catch((err) => console.log(err));
// };

// const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
//     axios
//         .post(`/api/update`, { _id: toDoId, text })
//         .then((data) => {
//             setText('');
//             setIsUpdating(false);
//             getAllToDo(setToDo);
//         })
//         .catch((err) => console.log(err));
// };

// const deleteToDo = (_id, setToDo) => {
//     axios
//         .post(`/api/delete`, { _id })
//         .then((data) => {
//             console.log(data);
//             getAllToDo(setToDo);
//         })
//         .catch((err) => console.log(err));
// };

// export { getAllToDo, addToDo, updateToDo, deleteToDo };

import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Lấy tất cả to-do
const getAllToDo = (setToDo) => {
    axios.get(`${baseUrl}/api`)
        .then(({ data }) => setToDo(data))
        .catch(err => console.error(err));
};

// Thêm to-do
const addToDo = (text, setText, setToDo) => {
    axios.post(`${baseUrl}/api/save`, { text })
        .then(({ data }) => {
            setText('');
            setToDo(prev => [...prev, data]);
        })
        .catch(err => console.error(err));
};

// Cập nhật to-do
const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
    axios.post(`${baseUrl}/api/update`, { _id: toDoId, text })
        .then(({ data }) => {
            setText('');
            setIsUpdating(false);
            setToDo(prev => prev.map(todo => todo._id === toDoId ? data : todo));
        })
        .catch(err => console.error(err));
};

// Xóa to-do
const deleteToDo = (_id, setToDo) => {
    axios.post(`${baseUrl}/api/delete`, { _id })
        .then(() => setToDo(prev => prev.filter(todo => todo._id !== _id)))
        .catch(err => console.error(err));
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };

