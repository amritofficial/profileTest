import { Injectable } from '@angular/core';
import { FinderTags } from '../models/finder-tags';
import { ResultCard } from '../view-models/result-card';
import { User } from '../models/user';
import { Profile } from '../models/profile';

var similarity = require('compute-cosine-similarity');

@Injectable()
export class SearchService {
  developersFinderTags: FinderTags[] = [];
  developers: User[] = [];
  developersProfile: Profile[] = [];
  resultCards: ResultCard[] = [];

  constructor() { }

  public searchDevelopers(searchTags: string[], developersFinderTags: FinderTags[], developers: User[], developersProfile: Profile[]) {
    this.developersFinderTags = developersFinderTags;
    this.developers = developers;
    this.developersProfile = developersProfile;
    let resultCards = this.processSearch(searchTags);
    return resultCards;
  }

  processSearch(searchTags: string[]) {
    let similarity = 0;
    let x = this.createDataset(searchTags);
    this.developersFinderTags.forEach(tags => {
      let y = this.createDataset(tags.tags);
      let s = this.findSimilarity(x, y);
      console.log("Similarity " + s);
      let developer: User = this.developers.find(developer => { return developer.userId == tags.userId });
      similarity = s;
      console.log(tags);
      if (similarity >= 50) {
        console.log(developer);
        if (developer != undefined) {
          let profile: Profile = this.developersProfile.find(profile => { return tags.userId == profile.userId });
          let resultCard: ResultCard = {
            avatar: developer.avatar,
            distance: 0,
            jobTitle: "Developer",
            percentMatch: similarity,
            username: developer.username,
            userId: developer.userId
          }
          this.resultCards.push(resultCard);
        }
      }
    });
    return this.resultCards;
  }

  createDataset(x: string[]) {
    let dictionary = {
      "javascript": 1,
      "java": 2,
      "angular": 3,
      "c#": 4,
      "android": 5,
      "python": 6,
      "node.js": 7,
      "nodejs": 7,
      "mysql": 8,
      "css": 9,
      "ios": 10,
      "swift": 11,
      "html": 12,
      "php": 13,
      "asp.net": 14,
      "xml": 15,
      "c++": 16,
      "spring": 17,
      "reactjs": 18,
      "react.js": 18,
      "mongodb": 19,
      "scala": 20,
      "machine learning": 21,
      "firebase": 22,
      "machinelearning": 21,
      "json": 23,
      "kotlin": 24,
      "ai": 25,
      "r": 26, 
      "bootstrap": 27,
      "web": 28,
      "odbc": 29,
      "ui": 30,
      "ux":31,
      "spring-boot": 32,
      "spring boot": 32,
      "springboot": 32,
      "ado.net": 33,
      "dom": 34,
      "jvm": 35,
      "entity": 36,
      "hibernate": 37,
      "rexx": 38,
      "mainframe": 39,
      "z os": 40,
      "zos": 40,
      "objectivec": 41,
      "objective c": 41,
      "tensor flow": 42,
      "tensorflow": 42,
      "tensorflows": 42,
      "sha": 43,
      "data science": 44,
      "datascience": 44,
      "css3": 45,
      "statistics": 46,
      "artificial intelligence": 47,
      "artificialintelligence": 47,
      "jpa": 48,
      "linux": 49,
      "materialdesign": 50,
      "material design": 50,
      "c": 51
    }

    let dataset: number[] = [];
    for (var key in dictionary) {
      if (x.indexOf(key) > -1) {
        console.log(key);
        dataset.push(dictionary[key]);
      }
    }

    console.log(dataset);
    return dataset;
  }

  findSimilarity(datasetOne, datasetTwo) {

    if (datasetOne.length > datasetTwo.length) {
      let length = datasetOne.length - datasetTwo.length;
      for (let index = 0; index < length; index++) {
        datasetTwo.push(0);
      }
    }
    else if (datasetOne.length < datasetTwo.length) {
      let length = datasetTwo.length - datasetOne.length;
      for (let index = 0; index < length; index++) {
        datasetOne.push(0);
      }
    }

    console.log(datasetOne);
    console.log(datasetTwo);

    let s = similarity(datasetOne, datasetTwo)
    return Math.round(s * 10000) / 100;
  }


}
