import React from 'react';

import { IoCreateOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { IoBarChartSharp } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

export const SideBar = [
  {
    title: '내 Seed',
    path: '/Mypage',
    icon: <IoHomeSharp />,
    cName: 'nav-text'
  },
  {
    title: '글쓰기',
    path: '/ShortWrite',
    icon: <IoCreateOutline />,
    cName: 'nav-text'
  },
  {
    title: '소식',
    path: '/News',
    icon: <IoNotifications />,
    cName: 'nav-text'
  },
  {
    title: '실시간 채팅',
    path: '/chathome',
    icon: <IoChatbubblesOutline />,
    cName: 'nav-text'
  },
  {
    title: 'Seed 분석',
    path: '/News',
    icon: <IoBarChartSharp />,
    cName: 'nav-text'
  },
  {
    title: '의견 보내기',
    path: '/News',
    icon: <IoChatboxEllipsesOutline />,
    cName: 'nav-text'
  }
];
