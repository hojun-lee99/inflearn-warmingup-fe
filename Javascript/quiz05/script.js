/*
  todo 최근 레포 목록 추가
 */
import GITHUB_TOKEN from './key.js';
import { Octokit } from 'https://esm.sh/@octokit/core';
const searchInput = document.getElementById('search-input');

//^ 검색 이벤트 함수
async function changedSearch(event) {
  const searchName = event.target.value;
  // check isBlank
  if (!searchName) {
    return hideInfoContainer();
  }

  const { responseInfo, responseRepo } = await getUserInfo(searchName);
  console.log(responseInfo, responseRepo);

  if (!responseInfo) {
    drawError();
  } else {
    // 업데이트를 위해 회원정보에 있는 요소들 전부 제거
    const userInfoCtn = document.getElementById('user-info-container');
    removeAllChild(userInfoCtn);
    drawUserInfo(responseInfo.data);
  }

  if (!responseRepo) {
    console.log('레포 정보가 없습니다!');
  } else {
    console.log(responseRepo);
    const latestRepoCtn = document.getElementById('latest-repo-container');
    removeAllChild(latestRepoCtn);
    drawLatestRepo(responseRepo.data);
  }
}

//^ 유저 정보 GET
async function getUserInfo(userName) {
  try {
    const octokit = new Octokit({ auth: `${GITHUB_TOKEN}` });

    const responseInfo = await octokit.request('GET /users/{username}', {
      username: userName,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    const responseRepo = await octokit.request(
      'GET /users/{username}/repos?per_page={repos_count}&sort={repos_sort}',
      {
        username: userName,
        repos_count: 5,
        repos_sort: 'created: asc',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    return { responseInfo, responseRepo };
  } catch (error) {
    return { responseInfo: null, responseRepo: null };
  }
}

//^ 검색 에러 박스 출력 함수
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

//^ 사용자 정보 출력 함수
function drawUserInfo(data) {
  // errorbox가 있을시 제거
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

  userInfoCtn.appendChild(imgProfileCtn);
  informationsCtn.appendChild(reposEtcInfoCtn);

  //* 데이터를 담은 컨테이너들을 userInfo컨테이너에 추가
  informationsCtn.appendChild(bioInfoCtn);
  userInfoCtn.appendChild(informationsCtn);
}

//^ userInfo컨테이너 숨기기
function hideInfoContainer() {
  const userInfoCtn = document.getElementById('user-info-container');
  const latestRepoCtn = document.getElementById('latest-repo-container');

  removeAllChild(userInfoCtn);
  removeAllChild(latestRepoCtn);

  userInfoCtn.classList.add('hidden');
  latestRepoCtn.classList.add('hidden');
}

function drawLatestRepo(datas) {
  const latestRepoCtn = document.getElementById('latest-repo-container');
  latestRepoCtn.classList.remove('hidden');
  datas.forEach((data) => {
    const { name, html_url, stargazers_count, watchers_count, forks_count } =
      data;
    const repoCtn = document.createElement('div');
    repoCtn.classList.add('container');
    repoCtn.id = 'repo-container';

    const aRepo = document.createElement('a');
    aRepo.href = html_url;
    aRepo.innerText = name;
    aRepo.target = '_blank';

    // 레포 정보 container
    const infosCtn = document.createElement('div');
    infosCtn.id = 'informations-container';
    const starsCtn = document.createElement('div');
    starsCtn.classList.add('etc-info');
    starsCtn.id = 'stars-container';
    starsCtn.innerText = `Stars: ${stargazers_count}`;
    const watchersCtn = document.createElement('div');
    watchersCtn.classList.add('etc-info');
    watchersCtn.id = 'watchers-container';
    watchersCtn.innerText = `Watchers: ${watchers_count}`;
    const forksCtn = document.createElement('div');
    forksCtn.classList.add('etc-info');
    forksCtn.id = 'forks-container';
    forksCtn.innerText = `forks: ${forks_count}`;

    infosCtn.appendChild(starsCtn);
    infosCtn.appendChild(watchersCtn);
    infosCtn.appendChild(forksCtn);

    repoCtn.appendChild(aRepo);
    repoCtn.appendChild(infosCtn);
    latestRepoCtn.appendChild(repoCtn);
  });
}

//^ 자식 요소 전부 제거
function removeAllChild(element) {
  const childNodes = element.querySelectorAll('*');
  childNodes.forEach((node) => node.remove());
}

searchInput.addEventListener('input', changedSearch);
