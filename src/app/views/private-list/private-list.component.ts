import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument   } from '@angular/fire/firestore';
import { Router } from '@angular/router'

@Component({
    selector: 'app-private-list',
    templateUrl: './private-list.component.html',
    styleUrls: ['./private-list.component.scss']
})
export class PrivateListComponent implements OnInit {

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
        this.router.navigate(['editor/1']);
    }

}
