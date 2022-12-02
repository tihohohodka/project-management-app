import { createAsyncThunk } from '@reduxjs/toolkit';
import { storeType, ressign } from './globalStore'


interface Bords {
  title: string,
  desc: string,
  id: string,
}



const changeBoardsInfAsync = createAsyncThunk<Bords[], undefined, { state: storeType }>(
  'BoardsContainer/fetch',
  async (arr: undefined, thunkAPI) => {
    const res = await fetch('https://kanban-server-production.up.railway.app/boards', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
    const data = await res.json();
    type dataType = ReturnType<typeof data>;
    const newCardInf = data.map((elem: dataType) => {
      const boarditem = JSON.parse(elem.title);
      boarditem.id = elem._id
      return boarditem;
    })
    console.log(newCardInf);
    return newCardInf;
  }
);

export default changeBoardsInfAsync;
