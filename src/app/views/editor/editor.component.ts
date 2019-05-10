import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router'

export interface Post { 
  post_title;
  post_desc;
  post_by;
  post_tags;
  post_image;
  post_content;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements OnInit {
   
    postUid;
    title;
    desc;
    name;
    tags;
    image;
    htmlContent = '';

  constructor ( private afs: AngularFirestore,  public router: Router, public route: ActivatedRoute ){}

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  }

  ngOnInit() {
    const mode = +this.route.snapshot.paramMap.get('mode');
    if (mode == 1) {
        console.log('get the post');
        const storedUid = JSON.parse(localStorage.getItem('selectedPost'));
        this.postUid = storedUid;
        const postDoc = this.afs.doc<Post>('db_posts/'+storedUid);
        const post = postDoc.valueChanges();
        post.subscribe(res=> { //converting oberv in array
            console.log('put post in da vars');
            this.title = res.post_title;
            this.desc = res.post_desc;
            this.name = res.post_by;
            this.tags = res.post_tags;
            this.image = res.post_image;
            this.htmlContent = res.post_content;
         });
        /* to dat */
    } 
    else {
        console.log('create new');
    }
  }

  deletePost(){
      /* jag deletar aldr men kanske han peter gör de??? */
          /* save to afs */
    this.afs.doc('db_posts/'+this.postUid).delete();
    /* fuck this */
    this.router.navigate(['private']);
  }
  

  savePost(){
    /* create object of shit, ah e cool så att*/

    /* if no uid create */
    if (this.postUid == null) {
      this.postUid= this.afs.createId();
    }

    const postData = {
        'post_uid': this.postUid,
        'post_title': this.title,
        'post_desc': this.desc,
        'post_by': this.name,
        'post_tags': this.tags,
        'post_image': this.image,
        'post_content': this.htmlContent,
    }

    /* save to afs */
    this.afs.collection("db_posts").doc(this.postUid).set(postData);
    /* fuck this */
    this.router.navigate(['private']);
  }

}

