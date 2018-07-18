import express from 'express';
import sortBy from 'lodash.sortby';
import { exec } from 'child_process';
import * as mikrotik from './mikrotik';

function isReachable(host) {
  return new Promise((resolve, reject) => {
    //Internal function no sanitation required
    exec(`ping -c 1 "${host}"`, { timeout: 100 }, (error) => {
      resolve(!error);
    });
  });
}

const router = new express.Router();

router.get('/devices', async (req, res, next)=> {
    //Removed the actual logic since it's very very very very specific to my router config
});

router.post('/connections/prefer/:routeName', async (req, res, next)=> {
  //Removed the actual logic since it's very very very very specific to my router config
});

router.get('/throughput/:interfaceName', async (req, res, next)=> {
  //Removed the actual logic since it's very very very very specific to my router config
});

router.post('/connections/toggle/:interfaceName', async (req, res, next)=> {
  //Removed the actual logic since it's very very very very specific to my router config
});

router.get('/connections', async (req, res, next)=> {
  //Removed the actual logic since it's very very very very specific to my router config  
});

router.get('/distraction-filter/devices', async (req, res, next)=> {
  //Removed the actual logic since it's very very very very specific to my router config
});

router.post('/distraction-filter/toggle/:deviceIp', async (req, res, next)=> {
  //Removed the actual logic since it's very very very very specific to my router config  
});

router.get('/vpn/devices', async (req, res, next)=> {
    //Removed the actual logic since it's very very very very specific to my router config
});

router.post('/vpn/toggle/:deviceIp', async (req, res, next)=> {
    //Removed the actual logic since it's very very very very specific to my router config
});

export default router;