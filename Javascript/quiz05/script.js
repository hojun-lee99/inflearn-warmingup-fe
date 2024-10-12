/*
 todo 최근 레포 목록 추가
 */
import GITHUB_TOKEN from './key.js';
import { Octokit } from 'https://esm.sh/@octokit/core';
const searchInput = document.getElementById('search-input');

function changedSearch(event) {
  const searchName = event.target.value;
  console.log(searchName);
  if (!searchName) {
    return hideContainer();
  }

  const userInfo = getUserInfo(searchName);
  userInfo.then((userInfo) => {
    if (!userInfo) {
      drawError();
    } else {
      //업데이트를 위해 회원정보에 있는 요소들 전부 제거
      const userInfoCtn = document.getElementById('user-info-container');
      removeAllChild(userInfoCtn);
      drawUserInfo(userInfo.data);
    }
  });
}

async function getUserInfo(userName) {
  try {
    const octokit = new Octokit({ auth: `${GITHUB_TOKEN}` });

    const response = await octokit.request('GET /users/{username}', {
      username: userName,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    return await response;
  } catch (error) {
    return null;
  }
}

function drawError() {
  // errorbox가 이미 출려 되어있으면 중복으로 출력하지 않기
  const alreadyExist = document.querySelector('.error-box');
  if (alreadyExist) {
    return true;
  }

  const main = document.querySelector('main');
  const errorBox = document.createElement('div');
  errorBox.className = 'error-box';
  errorBox.innerText = 'User not found';

  main.prepend(errorBox);
}

function drawUserInfo(data) {
  // errorbox가 있을시 숨기기
  const errorbox = document.querySelector('.error-box');
  if (errorbox) {
    errorbox.remove();
  }

  const userInfoCtn = document.getElementById('user-info-container');
  removeAllChild(userInfoCtn);

  const {
    avatar_url,
    html_url,
    public_repos,
    public_gists,
    followers,
    following,
    company,
    blog,
    location,
    created_at,
  } = data;

  userInfoCtn.classList.remove('hidden');

  //* 이미지랑 깃허브 링크를 담을 요소들
  const imgProfileCtn = document.createElement('div');
  imgProfileCtn.id = 'img-profile-container';

  const img = document.createElement('img');
  img.src = avatar_url;
  imgProfileCtn.appendChild(img);

  const userURL = document.createElement('a');
  userURL.href = html_url;
  userURL.target = '_blank';
  userURL.innerText = 'View Profile';
  imgProfileCtn.appendChild(userURL);

  userInfoCtn.appendChild(imgProfileCtn);

  const informationsCtn = document.createElement('div');
  informationsCtn.id = 'informations-container';

  const reposEtcInfoCtn = document.createElement('div');
  reposEtcInfoCtn.id = 'repos-etc-info-container';

  const bioInfoCtn = document.createElement('div');
  bioInfoCtn.id = 'bio-info-container';

  //* 각 데이터를 담을 div 생성
  const reposInfo = document.createElement('div');
  const gistsInfo = document.createElement('div');
  const followersInfo = document.createElement('div');
  const followingsInfo = document.createElement('div');
  const companyInfo = document.createElement('div');
  const blogInfo = document.createElement('div');
  const locationInfo = document.createElement('div');
  const createdAtInfo = document.createElement('div');

  //* repoEtcInfo에 담을 div
  reposInfo.classList.add('etc-info');
  reposInfo.id = 'repos-info';
  reposInfo.innerText = `Public Repos: ${public_repos}`;

  gistsInfo.classList.add('etc-info');
  gistsInfo.id = 'gists-info';
  gistsInfo.innerText = `Public Gists: ${public_gists}`;

  followersInfo.classList.add('etc-info');
  followersInfo.id = 'followers-info';
  followersInfo.innerText = `Followers: ${followers}`;

  followingsInfo.classList.add('etc-info');
  followingsInfo.id = 'followings-info';
  followingsInfo.innerText = `Followings: ${following}`;

  reposEtcInfoCtn.appendChild(reposInfo);
  reposEtcInfoCtn.appendChild(gistsInfo);
  reposEtcInfoCtn.appendChild(followersInfo);
  reposEtcInfoCtn.appendChild(followingsInfo);

  //* bioInfo에 담을 div
  companyInfo.classList.add('bio-info');
  companyInfo.id = 'company-info';
  companyInfo.innerText = `Company: ${company}`;

  blogInfo.classList.add('bio-info');
  blogInfo.id = 'blog-info';
  blogInfo.innerText = `Website/Blog: ${blog}`;

  locationInfo.classList.add('bio-info');
  locationInfo.id = 'location-info';
  locationInfo.innerText = `Location: ${location}`;

  createdAtInfo.classList.add('bio-info');
  createdAtInfo.id = 'created-at-info';
  createdAtInfo.innerText = `Member Since: ${created_at}`;

  bioInfoCtn.appendChild(companyInfo);
  bioInfoCtn.appendChild(blogInfo);
  bioInfoCtn.appendChild(locationInfo);
  bioInfoCtn.appendChild(createdAtInfo);

  informationsCtn.appendChild(reposEtcInfoCtn);
  informationsCtn.appendChild(bioInfoCtn);
  userInfoCtn.appendChild(informationsCtn);
}

function hideContainer() {
  const userInfoCtn = document.getElementById('user-info-container');
  const latestRepoCtn = document.getElementById('latest-repo-container');

  removeAllChild(userInfoCtn);
  removeAllChild(latestRepoCtn);

  userInfoCtn.classList.add('hidden');
  latestRepoCtn.classList.add('hidden');
}

// 자식 요소 전부 제거
function removeAllChild(element) {
  const childNodes = element.querySelectorAll('*');
  childNodes.forEach((node) => node.remove());
}

searchInput.addEventListener('input', changedSearch);
