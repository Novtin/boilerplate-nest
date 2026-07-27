/**
 * Нужно импортировать этот файл первым в исполняемом файле
 * Так как Sentry.init переопределяет функционал некоторых функций nestjs до их импорта
 */
import * as Sentry from '@sentry/nestjs';
// dotenv для загрузки process.env, без него будет undefined
import * as dotenv from 'dotenv';

// Загружаем переменные окружения, если они ещё не загружены
if (!process.env.APP_ENVIRONMENT) {
    dotenv.config({
        quiet: true,
    });
}

// Не инициализируем Sentry повторно
if (!Sentry.isInitialized()) {
    const {APP_SENTRY_DSN: dsn, APP_ENVIRONMENT: environment} = process.env;

    if (dsn) {
        Sentry.init({
            dsn,
            environment,
        });
    }
}
