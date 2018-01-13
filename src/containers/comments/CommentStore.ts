import { observable, action } from 'mobx';
import request from '../../utils/request';
import { filterInput } from '../../utils/util';

class CommentStore {

    @observable commentsMap: object = {};

    rootStore: object;

    constructor(initialState: any = {}, rootStore: object) {
        Object.assign(this, initialState);
        this.rootStore = rootStore;
    }

    @action.bound
    async saveComment(values: any) {
        //数据提交前对数据清洗
        Object.keys(values).map((key: string) => values[key] = filterInput(values[key]));
        let result = await request('/api/comments', {
            method: 'post',
            body: JSON.stringify(values)
        });
        if (result && result.success) {
            this.rootStore['post'].updatePost(result.data);
        }
        return result;
    }

}

export default CommentStore;
