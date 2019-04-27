import { Injectable } from '@angular/core';
import { IPlayer } from '../../model/player.model';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayDay } from 'src/app/model/playday.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  getPlayers() : Observable<IPlayer[]> {
    //return this.afs.collection<Player>('player', 
    //  ref => ref.where('title', '>', 'A').where('title', '<', 'C'));
    //return this.afs.collection<IPlayer>('/Players', ref => 
    //  ref.orderBy("lastname").orderBy("firstname")).
    //  valueChanges();
    return this.afs.collection<IPlayer>('/Players').
      valueChanges();
  }

  getPlayDays() : Observable<PlayDay[]> {
    //return this.afs.collection<Player>('player', 
    //  ref => ref.where('title', '>', 'A').where('title', '<', 'C'));
    return this.afs.collection<PlayDay>('/PlayDays').valueChanges();
  }

  getPlayDay(aId: number) : Observable<PlayDay[]> {
    //return this.afs.collection<Player>('player', 
    //  ref => ref.where('title', '>', 'A').where('title', '<', 'C'));
    return this.afs.collection<PlayDay>('/PlayDays', 
      ref => ref.where('id', '==', aId)).valueChanges();
  }
  
  /*
  postsCol: AngularFirestoreCollection<Post>;
  //posts: Observable<Post[]>;
  posts: Observable<PostId[]>;
  postDoc: AngularFirestoreDocument<Post>;
  singlePost: Observable<Post>;
  title:string;
  content:string;

  constructor(private afs: AngularFirestore) {}
  
    getPlayers() : Player {
      return this.afs.collection<Player>('player', 
      ref => ref.where('title', '>', 'A').where('title', '<', 'C'));
    }
    //this.postsCol = this.afs.collection('posts');
    return this.afs.collection<Player>('posts', 
      ref => ref.where('title', '>', 'A').where('title', '<', 'C'));
    //this.posts = this.postsCol.valueChanges();
    this.posts = this.postsCol.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data } as PostId;
        });
      }));
  }

  addPost() {
    this.afs.collection('posts').add({'title': this.title, 'content': this.content});
    //this.afs.collection('posts').doc('my-custom-id').set({'title': this.title, 'content': this.content});
  }

  getPost(postId) {
    this.postDoc = this.afs.doc('posts/'+postId);
    this.singlePost = this.postDoc.valueChanges();
  }

  deletePost(postId) {
    this.afs.doc('posts/'+postId).delete();
  }
  */
}
