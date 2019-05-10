import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument   } from '@angular/fire/firestore';
import { Router } from '@angular/router'

@Component({
    selector: 'app-public-list',
    templateUrl: './public-list.component.html',
    styleUrls: ['./public-list.component.scss']
})
export class PublicListComponent implements OnInit {

    subscribedPosts;

    constructor(
        private afs: AngularFirestore,
        public router: Router
    ){}

    ngOnInit() {
        this.getPosts();      
    }

    getPosts() {
        const postCollection = this.afs.collection('db_posts');
        const posts = postCollection.valueChanges().subscribe(x => {
            console.log(x)
            this.subscribedPosts = x;
        })
    }

      
    goToPost(postUid) {
      localStorage.setItem('selectedPost', JSON.stringify(postUid)); 
      this.router.navigate(['single']);
    }

}