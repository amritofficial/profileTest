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
      "odbc": 29 
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
    let s = similarity(datasetOne, datasetTwo)
    return Math.round(s * 10000) / 100;
  }


}
