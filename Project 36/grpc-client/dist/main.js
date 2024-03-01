"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_js_1 = require("@grpc/grpc-js");
const heroes_1 = require("./proto-ts/heroes");
const testHero = () => {
    const heroClient = new heroes_1.HeroesServiceClient('localhost:8765', grpc_js_1.credentials.createInsecure());
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 1);
    heroClient.waitForReady(deadline, (error) => {
        if (error) {
            console.error('error while waiting for HeroClient ready: ', error);
            return;
        }
        console.log('HeroClient is ready!');
        /// OK
        heroClient.findOne({ id: 1 }, (error, response) => {
            if (error) {
                console.error('error while finding one: ', error);
                return;
            }
            console.log('The HeroClient.findOne result', response);
            heroClient.close();
            console.log('HeroClient closed');
        });
        /// OK
        heroClient.findOne({ id: 4, type: 'human' }, (error, response) => {
            if (error) {
                console.error('error while finding one: ', error);
                return;
            }
            console.log('The HeroClient.findOne result', response);
            heroClient.close();
            console.log('HeroClient closed');
        });
        /// Error
        heroClient.findOne({ id: -1 }, (error, response) => {
            if (error) {
                console.error('error while finding one: ', error);
                return;
            }
            console.log('The HeroClient.findOne result', response);
            heroClient.close();
            console.log('HeroClient closed');
        });
        /// Error
        heroClient.findOne({ type: 'any' }, (error, response) => {
            if (error) {
                console.error('error while finding one: ', error);
                return;
            }
            console.log('The HeroClient.findOne result', response);
            heroClient.close();
            console.log('HeroClient closed');
        });
        /// OK
        heroClient.findMany({ type: 'human' }, (error, response) => {
            if (error) {
                console.error('error while findMany one: ', error);
                return;
            }
            console.log('The HeroClient.findMany result', response);
            heroClient.close();
            console.log('HeroClient closed');
        });
        /// OK
        heroClient.findMany({}, (error, response) => {
            if (error) {
                console.error('error while findMany one: ', error);
                return;
            }
            console.log('The HeroClient.findMany result', response);
            heroClient.close();
            console.log('HeroClient closed');
        });
        /// Error
        heroClient.findMany({ type: 'any' }, (error, response) => {
            if (error) {
                console.error('error while findMany one: ', error);
                return;
            }
            console.log('The HeroClient.findMany result', response);
            heroClient.close();
            console.log('HeroClient closed');
        });
    });
};
testHero();
