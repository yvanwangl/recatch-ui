import * as React from 'react';
import './index.css';

const About = () => {
    return (
        <div className='About'>
            <h2>关于小站</h2>
            <p>今天我的博客小站第二版正式上线了，一直以来都想拥有一个自己的博客，不是用现有的模板搭建的博客系统，而是自己用代码一行行实现的纯手工的博客，之前总感觉没有准备充分，最近一段时间在学习一些新的知识，就把这个想法给实现了。我认为博客的精髓就在于一个“轻”字，现有的模板系统对我来说都太重了，所以就自己实现了这个属于我们两个人的博客。</p>
            <p>搭建这个博客平台有两个目的：</p>
            <p>第一，分享一下博客搭建过程中的一些经验，与来到这里的你做一个分享；</p>
            <p>第二，记录一下自己平时学习过程中的一些心得，一来作为一个备忘的记录，二来与大家一起学习成长。</p>
            <p>我基于这个博客模板搭建了两套博客系统，如果你对设计感兴趣的话可以移步设计小站
                <a href='https://blog.yvanwang.com' target='_blank'>（sunnyhuan）</a>；如果你对前端感兴趣，我们可以在这个博客学习交流。
                我喜欢和朋友分享新知识、新技术，如果你有纯正的可以分享的干货欢迎提供的话，我会在这里给你做一个分享。
                </p>
            <p><a href='https://blog.yvanwang.com' target='_blank'>第一版博客</a></p>
        </div>
    );
};

export default About;