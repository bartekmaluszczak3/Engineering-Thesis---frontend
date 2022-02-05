import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthService } from './services/auth/auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { MyAnnouncementComponent } from './my_announcement/my-announcement.component';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { AddImageComponent } from './add-image/add-image.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchComponent } from './search/search.component';
import { LoggedUser } from './guard/LoggedUser';
import { EditImagesComponent } from './edit-images/edit-images.component';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HomeComponent,
    AddComponent,
    MyAnnouncementComponent,
    EditAnnouncementComponent,
    AnnouncementComponent,
    FavouriteComponent,
    AddImageComponent,
    EditProfileComponent,
    SearchComponent,
    EditImagesComponent,
    ErrorComponent,
    AdminComponent,
    AdminUsersComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule, 
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, AuthGuard, LoggedUser],
  bootstrap: [AppComponent]
})
export class AppModule { }
