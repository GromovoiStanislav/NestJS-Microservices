"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_js_1 = require("@grpc/grpc-js");
const hero_1 = require("./proto-ts/hero");
const vehicle_1 = require("./proto-ts/vehicle");
const testHero = () => {
    const heroClient = new hero_1.HeroServiceClient('localhost:8765', grpc_js_1.credentials.createInsecure());
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 1);
    heroClient.waitForReady(deadline, (error) => {
        if (error) {
            console.error('error while waiting for HeroClient ready: ', error);
            return;
        }
        console.log('HeroClient is ready!');
        heroClient.findOne({ id: 1 }, (error, response) => {
            if (error) {
                console.error('error while finding one: ', error);
                return;
            }
            console.log('The HeroClient.findOne result', response);
            heroClient.close();
            console.log('HeroClient closed');
        });
    });
};
const testVehicle = () => {
    const vehicleClient = new vehicle_1.VehicleServiceClient('localhost:8765', grpc_js_1.credentials.createInsecure());
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 1);
    vehicleClient.waitForReady(deadline, (error) => {
        let apiProcessed = 0;
        const close = () => {
            apiProcessed++;
            if (apiProcessed === 2) {
                vehicleClient.close();
                console.log('VehicleClient closed');
            }
        };
        if (error) {
            console.error('error while waiting for VehicleClient ready: ', error);
            return;
        }
        console.log('VehicleClient is ready!');
        vehicleClient.findOne({ id: 1 }, (error, response) => {
            if (error) {
                console.error('error while finding one: ', error);
                close();
                return;
            }
            console.log('The VehicleClient.findOne result', response);
            close();
        });
        vehicleClient.find({ brand: 'Honda' }, (error, response) => {
            if (error) {
                console.error('error while finding: ', error);
                close();
                return;
            }
            console.log('The VehicleClient.find result', response);
            close();
        });
    });
};
testHero();
testVehicle();
