import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicitemComponent } from './topicitem.component';

describe('TopicitemComponent', () => {
  let component: TopicitemComponent;
  let fixture: ComponentFixture<TopicitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
