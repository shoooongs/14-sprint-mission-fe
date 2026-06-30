import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import Task from './models/Task.js';
import cors from 'cors';

await mongoose.connect(process.env.DATABASE_URL);
console.log('Connected to DB');

const app = express();
app.use(express.json());
app.use(cors());


app.get('/tasks', async (req, res) => {
  const orderBy = req.query.orderBy || 'recent' ;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const keyword = req.query.keyword;
  

  const offset = (page - 1)*pageSize;
  const sortOption = { createdAt: orderBy === 'recent' ? 'desc' : 'asc' };
  try { 
    const query= {};

    if (keyword){
      query.$or = [
        {name: { $regex: keyword, $options: 'i' }},
        {description: { $regex: keyword, $options: 'i' }}
    ]}
    const totalCount = await Task.countDocuments(query);

    const items =
      await Task.find(query)
      .sort(sortOption)
      .skip(offset)
      .limit(pageSize)
      .select('name price createdAt');

    console.log(items);
     res.send({items, totalCount});
  } catch (error) {
    res.status(500).send({message: '페이지네이션 조회 실패'});
  }

});

app.get('/tasks/:id', async (req, res) =>{
  const item = await Task.findById(req.params.id)
    .select('name description price tags createdAt');
 
  if (item) {
    res.send(item);
  } else {
    res.status(404).send({message: 'Cannot find given id.'});
  }
});

app.post('/tasks', async (req, res) => {
  const newItem = await Task.create(req.body);
  res.status(201).send(newItem);
});

app.patch('/tasks/:id', async (req, res) => {
  const item = await Task.findById(req.params.id);
  
  if (item) {
    Object.keys(req.body).forEach((key) => {
      item[key] = req.body[key];
    });
    await item.save();
    res.send(item);
  } else {
    res.status(404).send({message: 'Cannot find given id.'});
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const item = await Task.findByIdAndDelete(req.params.id);
  if (item) {
    res.sendStatus(204);
  } else {
    res.status(404).send({message: 'cannot find given id.'});
  }
});


app.listen(process.env.PORT || 3002, () => console.log('server started'));