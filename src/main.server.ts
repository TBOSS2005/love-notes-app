import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (context?: unknown) => 
  bootstrapApplication(AppComponent, config, context as any);

export default bootstrap;