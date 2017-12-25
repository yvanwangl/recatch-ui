import { observable, action } from 'mobx';
import request from '../../utils/request';

class CommentStore {

    @observable commentsMap: object = {};

    rootStore: object;

    constructor(initialState: any = {}, rootStore: object){
        Object.assign(this, initialState);
        this.rootStore = rootStore;
    }

    @action.bound
    async saveComment(values: object){
        let result = await request('/api/comments', {
            method: 'post',
            body: JSON.stringify(values)
        });
        if(result && result.success) {
            this.rootStore['post'].updatePost(result.data);
            return result;
        }
    }

}

export default CommentStore;
