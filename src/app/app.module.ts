import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './components/title/title.component';
import { ContentComponent } from './components/content/content.component';
import { GridTileComponent } from './components/grid-tile/grid-tile.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    ContentComponent,
    GridTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
