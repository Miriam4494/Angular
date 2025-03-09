import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { CoursesListComponent } from '../components/courses-list/courses-list.component';
import { CourseDetailComponent } from '../components/course-details/course-details.component';
import { AddCourseComponent } from '../components/add-course/add-course.component';
import { EditCourseComponent } from '../components/edit-course/edit-course.component';
import { MyCoursesComponent } from '../components/my-courses/my-courses.component';
import { HomePageComponent } from '../components/home-page/home-page.component';



export const routes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            { path: '', component: HomePageComponent },
            { path: 'courses', component: CoursesListComponent },
            { path: 'myCourses', component: MyCoursesComponent },
            { path: 'courses/:id', component: CourseDetailComponent }, 
            { path: 'login', component: LoginComponent },
            { path: 'home', component: HomePageComponent },
            { path: 'addCourse', component: AddCourseComponent },
            { path: 'edit-course/:id', component: EditCourseComponent }  
        ],
    },

]




