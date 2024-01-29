import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {

	connect(process.env.MONGO_URI!, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	} as ConnectOptions).then(

		() => console.log("Успешное подключение к БД"),
		(error) => console.log(error)
	)
}