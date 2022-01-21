import { usePrefersColor } from '@umijs/preset-dumi/lib/theme'
import { Button, Popover, Radio, Space } from 'antd'
import { BgColorsOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'

function loadCss(target, cb) {
  let before = document.querySelectorAll('.amiya-theme')
  let css = document.createElement('style')
  css.innerHTML = target.style
  css.className = 'amiya-theme'
  document.getElementsByTagName('head')[0].appendChild(css)
  css.onload = () => {
    // 删除之前存在的
    if (before.length) {
      before.forEach(node => node.parentElement.removeChild(node))
    }
    cb()
  }
}

export let linkList = [
  {
    dark: false,
    name: 'default',
    cn: '默认',
    color: '#1890ff',
    style: `:root {
        --ant-primary-color: rgb(24, 144, 255);
        --ant-primary-color-disabled: #bae7ff;
        --ant-primary-color-hover: #40a9ff;
        --ant-primary-color-active: #0050b3;
        --ant-primary-color-outline: rgba(24, 144, 255, 0.2);
        --ant-primary-color-deprecated-bg: #bae7ff;
        --ant-primary-color-deprecated-border: #69c0ff;
        --ant-primary-1: #e6f7ff;
        --ant-primary-2: #bae7ff;
        --ant-primary-3: #91d5ff;
        --ant-primary-4: #69c0ff;
        --ant-primary-5: #40a9ff;
        --ant-primary-6: #1890ff;
        --ant-primary-7: #096dd9;
        --ant-primary-8: #0050b3;
        --ant-primary-9: #003a8c;
        --ant-primary-10: #002766;
        --ant-primary-color-deprecated-l-35: rgb(202, 230, 255);
        --ant-primary-color-deprecated-l-20: rgb(126, 193, 255);
        --ant-primary-color-deprecated-t-20: rgb(70, 166, 255);
        --ant-primary-color-deprecated-t-50: rgb(140, 200, 255);
        --ant-primary-color-deprecated-f-12: rgba(24, 144, 255, 0.12);
        --ant-primary-color-active-deprecated-f-30: rgba(230, 247, 255, 0.3);
        --ant-primary-color-active-deprecated-d-02: rgb(220, 244, 255);
    }`
  },
  {
    dark: false,
    name: 'cyan',
    cn: '明青',
    color: '#13c2c2',
    style: `:root {
      --ant-primary-color: rgb(19, 194, 194);
      --ant-primary-color-disabled: #b5f5ec;
      --ant-primary-color-hover: #36cfc9;
      --ant-primary-color-active: #006d75;
      --ant-primary-color-outline: rgba(19, 194, 194, 0.2);
      --ant-primary-color-deprecated-bg: #b5f5ec;
      --ant-primary-color-deprecated-border: #5cdbd3;
      --ant-primary-1: #e6fffb;
      --ant-primary-2: #b5f5ec;
      --ant-primary-3: #87e8de;
      --ant-primary-4: #5cdbd3;
      --ant-primary-5: #36cfc9;
      --ant-primary-6: #13c2c2;
      --ant-primary-7: #08979c;
      --ant-primary-8: #006d75;
      --ant-primary-9: #00474f;
      --ant-primary-10: #002329;
      --ant-primary-color-deprecated-l-35: rgb(147, 244, 244);
      --ant-primary-color-deprecated-l-20: rgb(77, 238, 238);
      --ant-primary-color-deprecated-t-20: rgb(66, 206, 206);
      --ant-primary-color-deprecated-t-50: rgb(137, 225, 225);
      --ant-primary-color-deprecated-f-12: rgba(19, 194, 194, 0.12);
      --ant-primary-color-active-deprecated-f-30: rgba(230, 255, 251, 0.3);
      --ant-primary-color-active-deprecated-d-02: rgb(220, 255, 249);
    }`
  },
  {
    dark: false,
    name: 'dust',
    cn: '薄暮',
    color: '#f5222d',
    style: `:root {
      --ant-primary-color: rgb(245, 34, 45);
      --ant-primary-color-disabled: #ffccc7;
      --ant-primary-color-hover: #ff4d4f;
      --ant-primary-color-active: #a8071a;
      --ant-primary-color-outline: rgba(245, 34, 45, 0.2);
      --ant-primary-color-deprecated-bg: #ffccc7;
      --ant-primary-color-deprecated-border: #ff7875;
      --ant-primary-1: #fff1f0;
      --ant-primary-2: #ffccc7;
      --ant-primary-3: #ffa39e;
      --ant-primary-4: #ff7875;
      --ant-primary-5: #ff4d4f;
      --ant-primary-6: #f5222d;
      --ant-primary-7: #cf1322;
      --ant-primary-8: #a8071a;
      --ant-primary-9: #820014;
      --ant-primary-10: #5c0011;
      --ant-primary-color-deprecated-l-35: rgb(253, 205, 207);
      --ant-primary-color-deprecated-l-20: rgb(249, 132, 138);
      --ant-primary-color-deprecated-t-20: rgb(247, 78, 87);
      --ant-primary-color-deprecated-t-50: rgb(250, 145, 150);
      --ant-primary-color-deprecated-f-12: rgba(245, 34, 45, 0.12);
      --ant-primary-color-active-deprecated-f-30: rgba(255, 241, 240, 0.3);
      --ant-primary-color-active-deprecated-d-02: rgb(255, 231, 230);
    }`
  },
  {
    dark: false,
    name: 'geekblue',
    cn: '极客蓝',
    color: '#2f54eb',
    style: `
      --ant-primary-color: rgb(47, 84, 235);
      --ant-primary-color-disabled: #d6e4ff;
      --ant-primary-color-hover: #597ef7;
      --ant-primary-color-active: #10239e;
      --ant-primary-color-outline: rgba(47, 84, 235, 0.2);
      --ant-primary-color-deprecated-bg: #d6e4ff;
      --ant-primary-color-deprecated-border: #85a5ff;
      --ant-primary-1: #f0f5ff;
      --ant-primary-2: #d6e4ff;
      --ant-primary-3: #adc6ff;
      --ant-primary-4: #85a5ff;
      --ant-primary-5: #597ef7;
      --ant-primary-6: #2f54eb;
      --ant-primary-7: #1d39c4;
      --ant-primary-8: #10239e;
      --ant-primary-9: #061178;
      --ant-primary-10: #030852;
      --ant-primary-color-deprecated-l-35: rgb(210, 218, 251);
      --ant-primary-color-deprecated-l-20: rgb(140, 160, 244);
      --ant-primary-color-deprecated-t-20: rgb(89, 118, 239);
      --ant-primary-color-deprecated-t-50: rgb(151, 170, 245);
      --ant-primary-color-deprecated-f-12: rgba(47, 84, 235, 0.12);
      --ant-primary-color-active-deprecated-f-30: rgba(240, 245, 255, 0.3);
      --ant-primary-color-active-deprecated-d-02: rgb(230, 238, 255);
    `
  },
  {
    dark: false,
    name: 'green',
    cn: '极光绿',
    color: '#52c41a',
    style: `
      --ant-primary-color: rgb(82, 196, 26);
      --ant-primary-color-disabled: #d9f7be;
      --ant-primary-color-hover: #73d13d;
      --ant-primary-color-active: #237804;
      --ant-primary-color-outline: rgba(82, 196, 26, 0.2);
      --ant-primary-color-deprecated-bg: #d9f7be;
      --ant-primary-color-deprecated-border: #95de64;
      --ant-primary-1: #f6ffed;
      --ant-primary-2: #d9f7be;
      --ant-primary-3: #b7eb8f;
      --ant-primary-4: #95de64;
      --ant-primary-5: #73d13d;
      --ant-primary-6: #52c41a;
      --ant-primary-7: #389e0d;
      --ant-primary-8: #237804;
      --ant-primary-9: #135200;
      --ant-primary-10: #092b00;
      --ant-primary-color-deprecated-l-35: rgb(186, 242, 158);
      --ant-primary-color-deprecated-l-20: rgb(138, 233, 91);
      --ant-primary-color-deprecated-t-20: rgb(117, 208, 72);
      --ant-primary-color-deprecated-t-50: rgb(169, 226, 141);
      --ant-primary-color-deprecated-f-12: rgba(82, 196, 26, 0.12);
      --ant-primary-color-active-deprecated-f-30: rgba(246, 255, 237, 0.3);
      --ant-primary-color-active-deprecated-d-02: rgb(241, 255, 227);
    `
  },
  {
    dark: false,
    name: 'purple',
    cn: '酱紫',
    color: '#722ed1',
    style: `
      --ant-primary-color: rgb(114, 46, 209);
      --ant-primary-color-disabled: #efdbff;
      --ant-primary-color-hover: #9254de;
      --ant-primary-color-active: #391085;
      --ant-primary-color-outline: rgba(114, 46, 209, 0.2);
      --ant-primary-color-deprecated-bg: #efdbff;
      --ant-primary-color-deprecated-border: #b37feb;
      --ant-primary-1: #f9f0ff;
      --ant-primary-2: #efdbff;
      --ant-primary-3: #d3adf7;
      --ant-primary-4: #b37feb;
      --ant-primary-5: #9254de;
      --ant-primary-6: #722ed1;
      --ant-primary-7: #531dab;
      --ant-primary-8: #391085;
      --ant-primary-9: #22075e;
      --ant-primary-10: #120338;
      --ant-primary-color-deprecated-l-35: rgb(213, 192, 241);
      --ant-primary-color-deprecated-l-20: rgb(170, 130, 227);
      --ant-primary-color-deprecated-t-20: rgb(142, 88, 218);
      --ant-primary-color-deprecated-t-50: rgb(185, 151, 232);
      --ant-primary-color-deprecated-f-12: rgba(114, 46, 209, 0.12);
      --ant-primary-color-active-deprecated-f-30: rgba(249, 240, 255, 0.3);
      --ant-primary-color-active-deprecated-d-02: rgb(245, 230, 255);
    `
  },
  {
    dark: false,
    name: 'sunset',
    cn: '日暮',
    color: '#fa8c16',
    style: `
      --ant-primary-color: rgb(250, 173, 20);
      --ant-primary-color-disabled: #fff1b8;
      --ant-primary-color-hover: #ffc53d;
      --ant-primary-color-active: #ad6800;
      --ant-primary-color-outline: rgba(250, 173, 20, 0.2);
      --ant-primary-color-deprecated-bg: #fff1b8;
      --ant-primary-color-deprecated-border: #ffd666;
      --ant-primary-1: #fffbe6;
      --ant-primary-2: #fff1b8;
      --ant-primary-3: #ffe58f;
      --ant-primary-4: #ffd666;
      --ant-primary-5: #ffc53d;
      --ant-primary-6: #faad14;
      --ant-primary-7: #d48806;
      --ant-primary-8: #ad6800;
      --ant-primary-9: #874d00;
      --ant-primary-10: #613400;
      --ant-primary-color-deprecated-l-35: rgb(254, 234, 195);
      --ant-primary-color-deprecated-l-20: rgb(252, 208, 120);
      --ant-primary-color-deprecated-t-20: rgb(251, 189, 67);
      --ant-primary-color-deprecated-t-50: rgb(253, 214, 138);
      --ant-primary-color-deprecated-f-12: rgba(250, 173, 20, 0.12);
      --ant-primary-color-active-deprecated-f-30: rgba(255, 251, 230, 0.3);
      --ant-primary-color-active-deprecated-d-02: rgb(255, 249, 220);
    `
  },
  {
    dark: false,
    name: 'volcano',
    cn: '火山',
    color: '#fa541c',
    style: `
      --ant-primary-color: rgb(250, 84, 28);
      --ant-primary-color-disabled: #ffd8bf;
      --ant-primary-color-hover: #ff7a45;
      --ant-primary-color-active: #ad2102;
      --ant-primary-color-outline: rgba(250, 84, 28, 0.2);
      --ant-primary-color-deprecated-bg: #ffd8bf;
      --ant-primary-color-deprecated-border: #ff9c6e;
      --ant-primary-1: #fff2e8;
      --ant-primary-2: #ffd8bf;
      --ant-primary-3: #ffbb96;
      --ant-primary-4: #ff9c6e;
      --ant-primary-5: #ff7a45;
      --ant-primary-6: #fa541c;
      --ant-primary-7: #d4380d;
      --ant-primary-8: #ad2102;
      --ant-primary-9: #871400;
      --ant-primary-10: #610b00;
      --ant-primary-color-deprecated-l-35: rgb(254, 216, 203);
      --ant-primary-color-deprecated-l-20: rgb(252, 159, 128);
      --ant-primary-color-deprecated-t-20: rgb(251, 118, 73);
      --ant-primary-color-deprecated-t-50: rgb(253, 170, 142);
      --ant-primary-color-deprecated-f-12: rgba(250, 84, 28, 0.12);
      --ant-primary-color-active-deprecated-f-30: rgba(255, 242, 232, 0.3);
      --ant-primary-color-active-deprecated-d-02: rgb(255, 236, 222);
    `
  },
  {
    dark: true,
    name: 'dark',
    cn: '默认',
    color: '#1890ff',
    style: `
      --darkreader-bg--ant-primary-color: #1765ae;
      --darkreader-text--ant-primary-color: #409fe7;
      --darkreader-border--ant-primary-color: #165d9d;
      --ant-primary-color-disabled: #bae7ff;
      --darkreader-bg--ant-primary-color-hover: #165f99;
      --darkreader-text--ant-primary-color-hover: #59ace8;
      --darkreader-border--ant-primary-color-hover: #165c94;
      --darkreader-bg--ant-primary-color-active: #144785;
      --darkreader-text--ant-primary-color-active: #70b2e9;
      --darkreader-border--ant-primary-color-active: #175fb6;
      --darkreader-bg--ant-primary-color-outline: rgba(23, 101, 174, 0.2);
      --ant-primary-color-deprecated-bg: #bae7ff;
      --ant-primary-color-deprecated-border: #69c0ff;
      --darkreader-bg--ant-primary-1: #113545;
      --darkreader-bg--ant-primary-2: #363838;
      --darkreader-border--ant-primary-3: #155780;
      --ant-primary-4: #69c0ff;
      --darkreader-bg--ant-primary-5: #165f99;
      --darkreader-text--ant-primary-5: #59ace8;
      --darkreader-border--ant-primary-5: #165c94;
      --darkreader-bg--ant-primary-6: #1765ae;
      --darkreader-text--ant-primary-6: #409fe7;
      --darkreader-bg--ant-primary-7: #1c5ca0;
      --darkreader-text--ant-primary-7: #5da6e2;
      --darkreader-border--ant-primary-7: #1c5ea5;
      --ant-primary-8: #0050b3;
      --ant-primary-9: #003a8c;
      --ant-primary-10: #002766;
      --darkreader-bg--ant-primary-color-deprecated-l-35: #323434;
      --darkreader-border--ant-primary-color-deprecated-l-20: #154f84;
      --ant-primary-color-deprecated-t-20: rgb(70, 166, 255);
      --ant-primary-color-deprecated-t-50: rgb(140, 200, 255);
      --ant-primary-color-deprecated-f-12: rgba(24, 144, 255, 0.12);
      --darkreader-bg--ant-primary-color-active-deprecated-f-30: rgba(17, 53, 69, 0.3);
      --darkreader-bg--ant-primary-color-active-deprecated-d-02: #12394a;
    `
  },
  {
    dark: true,
    name: 'dark-cyan',
    cn: '明青',
    color: '#13c2c2',
    style: `
      --darkreader-bg--ant-primary-color: #279794;
      --darkreader-text--ant-primary-color: #5fe1dd;
      --darkreader-border--ant-primary-color: #2ba8a4;
      --ant-primary-color-disabled: #b5f5ec;
      --darkreader-bg--ant-primary-color-hover: #3c9e97;
      --darkreader-text--ant-primary-color-hover: #5dcbc2;
      --darkreader-border--ant-primary-color-hover: #368d86;
      --darkreader-bg--ant-primary-color-active: #155a5e;
      --darkreader-text--ant-primary-color-active: #8aebed;
      --darkreader-border--ant-primary-color-active: #1fc3cb;
      --darkreader-bg--ant-primary-color-outline: rgba(39, 151, 148, 0.2);
      --ant-primary-color-deprecated-bg: #b5f5ec;
      --ant-primary-color-deprecated-border: #5cdbd3;
      --darkreader-bg--ant-primary-1: #134740;
      --darkreader-bg--ant-primary-2: #1f5c54;
      --darkreader-border--ant-primary-3: #2b7a6e;
      --ant-primary-4: #5cdbd3;
      --darkreader-bg--ant-primary-5: #3c9e97;
      --darkreader-text--ant-primary-5: #5dcbc2;
      --darkreader-border--ant-primary-5: #368d86;
      --darkreader-bg--ant-primary-6: #279794;
      --darkreader-text--ant-primary-6: #5fe1dd;
      --darkreader-bg--ant-primary-7: #1d7979;
      --darkreader-text--ant-primary-7: #74e7e6;
      --darkreader-border--ant-primary-7: #26b5b7;
      --ant-primary-8: #006d75;
      --ant-primary-9: #00474f;
      --ant-primary-10: #002329;
      --darkreader-bg--ant-primary-color-deprecated-l-35: #20706d;
      --darkreader-border--ant-primary-color-deprecated-l-20: #26908d;
      --ant-primary-color-deprecated-t-20: rgb(66, 206, 206);
      --ant-primary-color-deprecated-t-50: rgb(137, 225, 225);
      --ant-primary-color-deprecated-f-12: rgba(19, 194, 194, 0.12);
      --darkreader-bg--ant-primary-color-active-deprecated-f-30: rgba(19, 71, 64, 0.3);
      --darkreader-bg--ant-primary-color-active-deprecated-d-02: #134d44;
  }
    `
  },
  {
    dark: true,
    name: 'dark-dust',
    cn: '薄暮',
    color: '#f5222d',
    style: `
      --darkreader-bg--ant-primary-color: #a71a1f;
      --darkreader-text--ant-primary-color: #e24348;
      --darkreader-border--ant-primary-color: #99191e;
      --ant-primary-color-disabled: #ffccc7;
      --darkreader-bg--ant-primary-color-hover: #931212;
      --darkreader-text--ant-primary-color-hover: #ec5b59;
      --darkreader-border--ant-primary-color-hover: #901212;
      --darkreader-bg--ant-primary-color-active: #7f1721;
      --darkreader-text--ant-primary-color-active: #e7636f;
      --darkreader-border--ant-primary-color-active: #b21b2a;
      --darkreader-bg--ant-primary-color-outline: rgba(167, 26, 31, 0.2);
      --ant-primary-color-deprecated-bg: #ffccc7;
      --ant-primary-color-deprecated-border: #ff7875;
      --darkreader-bg--ant-primary-1: #40120e;
      --darkreader-bg--ant-primary-2: #56170f;
      --darkreader-border--ant-primary-3: #7c1710;
      --ant-primary-4: #ff7875;
      --darkreader-bg--ant-primary-5: #931212;
      --darkreader-text--ant-primary-5: #ec5b59;
      --darkreader-border--ant-primary-5: #901212;
      --darkreader-bg--ant-primary-6: #a71a1f;
      --darkreader-text--ant-primary-6: #e24348;
      --darkreader-bg--ant-primary-7: #9b2028;
      --darkreader-text--ant-primary-7: #db4d55;
      --darkreader-border--ant-primary-7: #9f2129;
      --ant-primary-8: #a8071a;
      --ant-primary-9: #820014;
      --ant-primary-10: #5c0011;
      --darkreader-bg--ant-primary-color-deprecated-l-35: #501214;
      --darkreader-border--ant-primary-color-deprecated-l-20: #7f181b;
      --ant-primary-color-deprecated-t-20: rgb(247, 78, 87);
      --ant-primary-color-deprecated-t-50: rgb(250, 145, 150);
      --ant-primary-color-deprecated-f-12: rgba(245, 34, 45, 0.12);
      --darkreader-bg--ant-primary-color-active-deprecated-f-30: rgba(64, 18, 14, 0.3);
      --darkreader-bg--ant-primary-color-active-deprecated-d-02: #45120e;
    `
  },
  {
    dark: true,
    name: 'dark-geekblue',
    cn: '极客蓝',
    color: '#2f54eb',
    style: `
      --darkreader-bg--ant-primary-color: #21399c;
      --darkreader-text--ant-primary-color: #508cd8;
      --darkreader-border--ant-primary-color: #1f358e;
      --ant-primary-color-disabled: #d6e4ff;
      --darkreader-bg--ant-primary-color-hover: #183288;
      --darkreader-text--ant-primary-color-hover: #69a0e2;
      --darkreader-border--ant-primary-color-hover: #183288;
      --darkreader-bg--ant-primary-color-active: #1c2876;
      --darkreader-text--ant-primary-color-active: #7da5dd;
      --darkreader-border--ant-primary-color-active: #2334a6;
      --darkreader-bg--ant-primary-color-outline: rgba(33, 57, 156, 0.2);
      --ant-primary-color-deprecated-bg: #d6e4ff;
      --ant-primary-color-deprecated-border: #85a5ff;
      --darkreader-bg--ant-primary-1: #282929;
      --darkreader-bg--ant-primary-2: #2f3130;
      --darkreader-border--ant-primary-3: #123177;
      --ant-primary-4: #85a5ff;
      --darkreader-bg--ant-primary-5: #183288;
      --darkreader-text--ant-primary-5: #69a0e2;
      --darkreader-border--ant-primary-5: #183288;
      --darkreader-bg--ant-primary-6: #21399c;
      --darkreader-text--ant-primary-6: #508cd8;
      --darkreader-bg--ant-primary-7: #263890;
      --darkreader-text--ant-primary-7: #6a98d4;
      --darkreader-border--ant-primary-7: #283a96;
      --ant-primary-8: #10239e;
      --ant-primary-9: #061178;
      --ant-primary-10: #030852;
      --darkreader-bg--ant-primary-color-deprecated-l-35: #313333;
      --darkreader-border--ant-primary-color-deprecated-l-20: #1c2d78;
      --ant-primary-color-deprecated-t-20: rgb(89, 118, 239);
      --ant-primary-color-deprecated-t-50: rgb(151, 170, 245);
      --ant-primary-color-deprecated-f-12: rgba(47, 84, 235, 0.12);
      --darkreader-bg--ant-primary-color-active-deprecated-f-30: rgba(40, 41, 41, 0.3);
      --darkreader-bg--ant-primary-color-active-deprecated-d-02: #2a2c2c;
    `
  },
  {
    dark: true,
    name: 'dark-green',
    cn: '极光绿',
    color: '#52c41a',
    style: `
      --darkreader-bg--ant-primary-color: #509827;
      --darkreader-text--ant-primary-color: #88db57;
      --darkreader-border--ant-primary-color: #54a028;
      --ant-primary-color-disabled: #d9f7be;
      --darkreader-bg--ant-primary-color-hover: #6d9a35;
      --darkreader-text--ant-primary-color-hover: #89cc5a;
      --darkreader-border--ant-primary-color-hover: #558b30;
      --darkreader-bg--ant-primary-color-active: #2c6214;
      --darkreader-text--ant-primary-color-active: #a5ef81;
      --darkreader-border--ant-primary-color-active: #4fc71e;
      --darkreader-bg--ant-primary-color-outline: rgba(80, 152, 39, 0.2);
      --ant-primary-color-deprecated-bg: #d9f7be;
      --ant-primary-color-deprecated-border: #95de64;
      --darkreader-bg--ant-primary-1: #324411;
      --darkreader-bg--ant-primary-2: #42581a;
      --darkreader-border--ant-primary-3: #4c7825;
      --ant-primary-4: #95de64;
      --darkreader-bg--ant-primary-5: #6d9a35;
      --darkreader-text--ant-primary-5: #89cc5a;
      --darkreader-border--ant-primary-5: #558b30;
      --darkreader-bg--ant-primary-6: #509827;
      --darkreader-text--ant-primary-6: #88db57;
      --darkreader-bg--ant-primary-7: #3c7c1c;
      --darkreader-text--ant-primary-7: #96e66b;
      --darkreader-border--ant-primary-7: #53b324;
      --ant-primary-8: #237804;
      --ant-primary-9: #135200;
      --ant-primary-10: #092b00;
      --darkreader-bg--ant-primary-color-deprecated-l-35: #46691f;
      --darkreader-border--ant-primary-color-deprecated-l-20: #498824;
      --ant-primary-color-deprecated-t-20: rgb(117, 208, 72);
      --ant-primary-color-deprecated-t-50: rgb(169, 226, 141);
      --ant-primary-color-deprecated-f-12: rgba(82, 196, 26, 0.12);
      --darkreader-bg--ant-primary-color-active-deprecated-f-30: rgba(50, 68, 17, 0.3);
      --darkreader-bg--ant-primary-color-active-deprecated-d-02: #354a11;
    `
  },
  {
    dark: true,
    name: 'dark-purple',
    cn: '酱紫',
    color: '#722ed1',
    style: `
      --darkreader-bg--ant-primary-color: #60339a;
      --darkreader-text--ant-primary-color: #824fc3;
      --darkreader-border--ant-primary-color: #562e88;
      --ant-primary-color-disabled: #efdbff;
      --darkreader-bg--ant-primary-color-hover: #562a87;
      --darkreader-text--ant-primary-color-hover: #9766cd;
      --darkreader-border--ant-primary-color-hover: #522880;
      --darkreader-bg--ant-primary-color-active: #371b66;
      --darkreader-text--ant-primary-color-active: #a07bda;
      --darkreader-border--ant-primary-color-active: #5626aa;
      --darkreader-bg--ant-primary-color-outline: rgba(96, 51, 154, 0.2);
      --ant-primary-color-deprecated-bg: #efdbff;
      --ant-primary-color-deprecated-border: #b37feb;
      --darkreader-bg--ant-primary-1: #282929;
      --darkreader-bg--ant-primary-2: #2d2f2f;
      --darkreader-border--ant-primary-3: #481a70;
      --ant-primary-4: #b37feb;
      --darkreader-bg--ant-primary-5: #562a87;
      --darkreader-text--ant-primary-5: #9766cd;
      --darkreader-border--ant-primary-5: #522880;
      --darkreader-bg--ant-primary-6: #60339a;
      --darkreader-text--ant-primary-6: #824fc3;
      --darkreader-bg--ant-primary-7: #492580;
      --darkreader-text--ant-primary-7: #9065cf;
      --darkreader-border--ant-primary-7: #562a99;
      --ant-primary-8: #391085;
      --ant-primary-9: #22075e;
      --ant-primary-10: #120338;
      --darkreader-bg--ant-primary-color-deprecated-l-35: #383b3a;
      --darkreader-border--ant-primary-color-deprecated-l-20: #492873;
      --ant-primary-color-deprecated-t-20: rgb(142, 88, 218);
      --ant-primary-color-deprecated-t-50: rgb(185, 151, 232);
      --ant-primary-color-deprecated-f-12: rgba(114, 46, 209, 0.12);
      --darkreader-bg--ant-primary-color-active-deprecated-f-30: rgba(40, 41, 41, 0.3);
      --darkreader-bg--ant-primary-color-active-deprecated-d-02: #2a2c2c;
    `
  },
  {
    dark: true,
    name: 'dark-sunset',
    cn: '日暮',
    color: '#fa8c16',
    style: `
      --darkreader-bg--ant-primary-color: #b8831b;
      --darkreader-text--ant-primary-color: #eeb23d;
      --darkreader-border--ant-primary-color: #a5771a;
      --ant-primary-color-disabled: #fff1b8;
      --darkreader-bg--ant-primary-color-hover: #a27816;
      --darkreader-text--ant-primary-color-hover: #f4c454;
      --darkreader-border--ant-primary-color-hover: #9c7416;
      --darkreader-bg--ant-primary-color-active: #885a14;
      --darkreader-text--ant-primary-color-active: #f3b860;
      --darkreader-border--ant-primary-color-active: #c17e18;
      --darkreader-bg--ant-primary-color-outline: rgba(184, 131, 27, 0.2);
      --ant-primary-color-deprecated-bg: #fff1b8;
      --ant-primary-color-deprecated-border: #ffd666;
      --darkreader-bg--ant-primary-1: #493f11;
      --darkreader-bg--ant-primary-2: #625113;
      --darkreader-border--ant-primary-3: #876c15;
      --ant-primary-4: #ffd666;
      --darkreader-bg--ant-primary-5: #a27816;
      --darkreader-text--ant-primary-5: #f4c454;
      --darkreader-border--ant-primary-5: #9c7416;
      --darkreader-bg--ant-primary-6: #b8831b;
      --darkreader-text--ant-primary-6: #eeb23d;
      --darkreader-bg--ant-primary-7: #a5711a;
      --darkreader-text--ant-primary-7: #edb14a;
      --darkreader-border--ant-primary-7: #b17a1b;
      --ant-primary-8: #ad6800;
      --ant-primary-9: #874d00;
      --ant-primary-10: #613400;
      --darkreader-bg--ant-primary-color-deprecated-l-35: #5a4112;
      --darkreader-border--ant-primary-color-deprecated-l-20: #8a6417;
      --ant-primary-color-deprecated-t-20: rgb(251, 189, 67);
      --ant-primary-color-deprecated-t-50: rgb(253, 214, 138);
      --ant-primary-color-deprecated-f-12: rgba(250, 173, 20, 0.12);
      --darkreader-bg--ant-primary-color-active-deprecated-f-30: rgba(73, 63, 17, 0.3);
      --darkreader-bg--ant-primary-color-active-deprecated-d-02: #4e4411;
    `
  },
  {
    dark: true,
    name: 'dark-volcano',
    cn: '火山',
    color: '#fa541c',
    style: `
      --darkreader-bg--ant-primary-color: #ae3e17;
      --darkreader-text--ant-primary-color: #e86b3d;
      --darkreader-border--ant-primary-color: #9e3a16;
      --ant-primary-color-disabled: #ffd8bf;
      --darkreader-bg--ant-primary-color-hover: #9a3a13;
      --darkreader-text--ant-primary-color-hover: #ef8356;
      --darkreader-border--ant-primary-color-hover: #963913;
      --darkreader-bg--ant-primary-color-active: #842813;
      --darkreader-text--ant-primary-color-active: #ec7a5d;
      --darkreader-border--ant-primary-color-active: #b93415;
      --darkreader-bg--ant-primary-color-outline: rgba(174, 62, 23, 0.2);
      --ant-primary-color-deprecated-bg: #ffd8bf;
      --ant-primary-color-deprecated-border: #ff9c6e;
      --darkreader-bg--ant-primary-1: #462710;
      --darkreader-bg--ant-primary-2: #5b2e11;
      --darkreader-border--ant-primary-3: #813a12;
      --ant-primary-4: #ff9c6e;
      --darkreader-bg--ant-primary-5: #9a3a13;
      --darkreader-text--ant-primary-5: #ef8356;
      --darkreader-border--ant-primary-5: #963913;
      --darkreader-bg--ant-primary-6: #ae3e17;
      --darkreader-text--ant-primary-6: #e86b3d;
      --darkreader-bg--ant-primary-7: #a03a1b;
      --darkreader-text--ant-primary-7: #e26b48;
      --darkreader-border--ant-primary-7: #a63c1c;
      --ant-primary-8: #ad2102;
      --ant-primary-9: #871400;
      --ant-primary-10: #610b00;
      --darkreader-bg--ant-primary-color-deprecated-l-35: #532311;
      --darkreader-border--ant-primary-color-deprecated-l-20: #843214;
      --ant-primary-color-deprecated-t-20: rgb(251, 118, 73);
      --ant-primary-color-deprecated-t-50: rgb(253, 170, 142);
      --ant-primary-color-deprecated-f-12: rgba(250, 84, 28, 0.12);
      --darkreader-bg--ant-primary-color-active-deprecated-f-30: rgba(70, 39, 16, 0.3);
      --darkreader-bg--ant-primary-color-active-deprecated-d-02: #4b2910;
    `
  }
]

export default function ThemeButton(props) {
  const [name, setName] = useState<string>(localStorage.getItem('AMIYA_COLOR') || 'default')
  const [dumiColor, setDumiColor] = usePrefersColor()
  const [loading, setLoading] = useState(false)

  const handleThemeChange = (value: string) => {
    setName(value)
  }

  useEffect(() => {
    let target = linkList.find(item => item.name === name)
    setLoading(true)
    loadCss(target, () => {
      let colorStyle = document.querySelector('#color')
      if (colorStyle) {
        document.head.removeChild(colorStyle)
      }
      let style = document.createElement('style')
      style.id = 'color'
      style.innerHTML = `
        ::selection {
          background: ${target.color};
          color: #fff;
        }
        .markdown a,
        .__dumi-default-previewer .ant-alert-content a,
        .ay-search-table-footer-actions a {
          color: ${target.color}!important
        }
        ul[role='slug-list'] li > a.active,
        [data-prefers-color=dark] .__dumi-default-layout-toc li a:hover {
          color: ${target.color}!important;
        }
        .__dumi-default-layout-toc li a.active::before {
          background: ${target.color}!important;
        }
        .__dumi-default-search > ul li a:hover {
          color: ${target.color}!important;
        }

      `
      document.head.appendChild(style)
      localStorage.setItem('AMIYA_COLOR', name)
      if (target.dark) {
        document.body.classList.add('dark')
        setDumiColor('dark')
      } else {
        document.body.classList.remove('dark')
        setDumiColor('light')
      }
      setLoading(false)
    })
  }, [name])

  return null
  // return (
  //   <Popover
  //     title="请选择主题色"
  //     content={
  //       <Radio.Group value={name} onChange={e => handleThemeChange(e.target.value)}>
  //         <Space direction="vertical">
  //           {linkList.map(link => (
  //             <Radio value={link.name} key={link.name}>
  //               <Space>
  //                 <span className="__amiya-theme-color" style={{ background: link.color }}></span>
  //                 {link.dark ? '暗-' + link.cn : link.cn}
  //               </Space>
  //             </Radio>
  //           ))}
  //         </Space>
  //       </Radio.Group>
  //     }
  //   >
  //     <Button
  //       className="__amiya-theme"
  //       shape="circle"
  //       type="primary"
  //       loading={loading}
  //       icon={<BgColorsOutlined />}
  //     ></Button>
  //   </Popover>
  // )
}
