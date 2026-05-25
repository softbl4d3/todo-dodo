import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: process.env.CORS_ORIGIN?.split(",") ?? [
			"http://localhost",
			"http://localhost:80",
			"http://127.0.0.1",
			"http://127.0.0.1:80",
		],
		methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	});
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);
	await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
