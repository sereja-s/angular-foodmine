import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import { User, UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs';
import { HTTP_BAD_REQUEST } from "../constants/http_status";

const router = Router();

router.get("/seed", asyncHandler(
	async (req, res) => {
		const usersCount = await UserModel.countDocuments();
		if(usersCount> 0){
		  res.send("Такое (для пользователей) уже есть в БД !!!");
		  return;
		}
 
		await UserModel.create(sample_users);
		res.send("Seed пользователей готов !");
  }
  ))

/* router.post("/login", (req, res) => {
	const {email, password} = req.body;
	const user = sample_users.find(user => user.email === email 
	  && user.password === password);
 
	 if(user) {
	  res.send(generateTokenReponse(user));
	 }
	 else{
		const BAD_REQUEST = 400;
		res.status(BAD_REQUEST).send("Имя пользователя или пароль не верны!");
	 }
 
 }) */

 router.post("/login", asyncHandler(
	async (req, res) => {
	  const {email, password} = req.body;
	  const user = await UserModel.findOne({email});
 
		if(user/*  && (await bcrypt.compare(password,user.password)) */) {
		 res.send(generateTokenReponse(user));
		}
		else{
		  /* const BAD_REQUEST = 400;
		  res.status(BAD_REQUEST).send("Имя пользователя или пароль не верны!"); */
		  res.status(HTTP_BAD_REQUEST).send("Имя пользователя или пароль не верны!");
		}
 
	}
 ))

/*  const generateTokenReponse = (user: any) => {
	const token = jwt.sign({
	  email: user.email, isAdmin: user.isAdmin
	},"SomeRandomText", {
	  expiresIn:"30d"
	});
 
	user.token = token;
	return user;
 } */

router.post('/register', asyncHandler(
 // на вход: 1-асинхронный запрос 2-асинхронный ответ
	async (req, res) => {
		// поля которые мы хотим получить от клиента (соответствуют запросу)
	  const {name, email, password, address} = req.body;

		// проверим зарегистрирован ли пользователь с указанным в запросе email
	  const user = await UserModel.findOne({email});
	  if(user){
		 res.status(HTTP_BAD_REQUEST).send('Такой пользователь уже существует! Пожалуйста авторизуйтесь');
		 return;
	  }
 
		// сохраним пароль пользователя в БД предварительно его захешировав
	  const encryptedPassword = await bcrypt.hash(password, 10);
 
		// сохраним нового пользователя (новый объект класса пользователь)
		const newUser: User = {
		  // идентификатор будет сгенерирован автоматически
			id: '',
			// имя переменной и название поля совпадают укажем так:
		 name,
		 email: email.toLowerCase(),
		 password: encryptedPassword,
		 address,
		 isAdmin: false
	  }
 
		// сохраним нового пользователя в БД и вернём пользователя (его идентификатор)
	  const dbUser = await UserModel.create(newUser);
	  res.send(generateTokenReponse(dbUser));
	}
 ))

 const generateTokenReponse = (user : User) => {
	const token = jwt.sign({
		id: user.id, email:user.email, isAdmin: user.isAdmin
	},process.env.JWT_SECRET!,{
	  expiresIn:"30d"
	});

	return {
	  id: user.id,
	  email: user.email,
	  name: user.name,
	  address: user.address,
	  isAdmin: user.isAdmin,
	  token: token
	};
 }

export default router;