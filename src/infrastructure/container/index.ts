import 'reflect-metadata';
import { container } from 'tsyringe';

// Importar todos los servicios, repositorios, controladores y otros componentes que necesiten ser inyectados.
import { IEventRepository } from '@domain/repositories/IEventRepository';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IAttendeeRepository } from '@domain/repositories/IAttendeeRepository';
import { ILocationRepository } from '@domain/repositories/ILocationRepository';

import { EventRepository } from '@infrastructure/repositories/EventRepository';
import { UserRepository } from '@infrastructure/repositories/UserRepository';
import { AttendeeRepository } from '@infrastructure/repositories/AttendeeRepository';
import { LocationRepository } from '@infrastructure/repositories/LocationRepository';

import { EventService as DomainEventService } from '@domain/services/EventService';
import { AttendeeService as DomainAttendeeService } from '@domain/services/AttendeeService';
import { LocationService as DomainLocationService } from '@domain/services/LocationService';
import { MetricsService as DomainMetricsService } from '@domain/services/MetricsService';
import { GeocodingService } from '@domain/services/GeocodingService';
import { ExcelProcessingService } from '@domain/services/ExcelProcessingService';
import { AuthService } from '@domain/services/AuthService';

import { EventService as ApplicationEventService } from '@application/services/EventService';
import { AttendeeService as ApplicationAttendeeService } from '@application/services/AttendeeService';
import { LocationService as ApplicationLocationService } from '@application/services/LocationService';

import {CreateEventUseCase} from "@application/use-cases/CreateEventUseCase";
import {DeleteEventUseCase} from "@application/use-cases/DeleteEventUseCase";
import {FindEventByIdUseCase} from "@application/use-cases/FindEventByIdUseCase";
import {FindEventsByOrganizerUseCase} from "@application/use-cases/FindEventsByOrganizerUseCase";
import {FindNearbyEventsUseCase} from "@application/use-cases/FindNearbyEventsUseCase";
import {RegisterAttendeeUseCase} from "@application/use-cases/RegisterAttendeeUseCase";
import {UpdateEventUseCase} from "@application/use-cases/UpdateEventUseCase";

import { EventController } from '@infrastructure/api/controllers/EventController';
import { AuthMiddleware } from '@infrastructure/api/middlewares/AuthMiddleware';

// Registrar use-cases
container.registerSingleton<CreateEventUseCase>('CreateEventUseCase', CreateEventUseCase);
container.registerSingleton<DeleteEventUseCase>('DeleteEventUseCase', DeleteEventUseCase);
container.registerSingleton<FindEventByIdUseCase>('FindEventByIdUseCase', FindEventByIdUseCase);
container.registerSingleton<FindEventsByOrganizerUseCase>('FindEventsByOrganizerUseCase', FindEventsByOrganizerUseCase);
container.registerSingleton<FindNearbyEventsUseCase>('FindNearbyEventsUseCase', FindNearbyEventsUseCase);
container.registerSingleton<RegisterAttendeeUseCase>('RegisterAttendeeUseCase', RegisterAttendeeUseCase);
container.registerSingleton<UpdateEventUseCase>('UpdateEventUseCase', UpdateEventUseCase);

// Registrar repositorios
container.registerSingleton<IEventRepository>('IEventRepository', EventRepository);
container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
container.registerSingleton<IAttendeeRepository>('IAttendeeRepository', AttendeeRepository);
container.registerSingleton<ILocationRepository>('ILocationRepository', LocationRepository);
/*
// Registrar interfaces con sus implementaciones
container.register<IEventRepository>('IEventRepository', { useClass: EventRepository });
container.register<IUserRepository>('IUserRepository', { useClass: UserRepository });
*/
// Registrar servicios de dominio
container.registerSingleton<DomainEventService>('DomainEventService', DomainEventService);
container.registerSingleton<DomainAttendeeService>('DomainAttendeeService', DomainAttendeeService);
container.registerSingleton<DomainLocationService>('DomainLocationService', DomainLocationService);
container.registerSingleton<DomainMetricsService>('DomainMetricsService', DomainMetricsService);
container.registerSingleton<GeocodingService>('GeocodingService', GeocodingService);
container.registerSingleton<ExcelProcessingService>('ExcelProcessingService', ExcelProcessingService);
container.registerSingleton<AuthService>('AuthService', AuthService);

// Registrar servicios de aplicación
container.registerSingleton<ApplicationEventService>('ApplicationEventService', ApplicationEventService);
container.registerSingleton<ApplicationAttendeeService>('ApplicationAttendeeService', ApplicationAttendeeService);
container.registerSingleton<ApplicationLocationService>('ApplicationLocationService', ApplicationLocationService);

// Registrar controladores
container.registerSingleton<EventController>('EventController', EventController);

// Registrar middlewares
container.registerSingleton<AuthMiddleware>('AuthMiddleware', AuthMiddleware);

export { container };
