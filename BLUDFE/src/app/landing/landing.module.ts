import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { LandingComponent } from './landing.component';
import { BestComponent } from './shared-page/best/best.component';
import { ContactFormComponent } from './shared-page/contact-form/contact-form.component';
import { FaqsComponent } from './shared-page/faqs/faqs.component';
import { FeaturesComponent } from './shared-page/features/features.component';
import { FooterComponent } from './shared-page/footer/footer.component';
import { HeaderComponent } from './shared-page/header/header.component';
import { IntroSixComponent } from './shared-page/intro-six/intro-six.component';
import { LeftImageComponent } from './shared-page/left-image/left-image.component';
import { NewsTwoComponent } from './shared-page/news-two/news-two.component';
import { PricingOneComponent } from './shared-page/pricing-one/pricing-one.component';
import { RightImageComponent } from './shared-page/right-image/right-image.component';
import { ServicesComponent } from './shared-page/services/services.component';
import { TeamComponent } from './shared-page/team/team.component';
import { TestimonialComponent } from './shared-page/testimonial/testimonial.component';
import { WorksCarouselComponent } from './shared-page/works-carousel/works-carousel.component';
import { NguCarouselModule } from '@ngu/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { WINDOW_PROVIDERS } from './helpers/window.helpers';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    MainPageComponent, 
    LandingComponent,
    BestComponent,
    ContactFormComponent,
    FaqsComponent,
    FeaturesComponent,
    FooterComponent,
    HeaderComponent,
    IntroSixComponent,
    LeftImageComponent,
    NewsTwoComponent,
    PricingOneComponent,
    RightImageComponent,
    ServicesComponent,
    TeamComponent,
    TestimonialComponent,
    WorksCarouselComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    NguCarouselModule,
    NgbModule,
    FormsModule,
    SharedModule
  ],
  providers: [WINDOW_PROVIDERS],
  exports: []
})
export class LandingModule { }
