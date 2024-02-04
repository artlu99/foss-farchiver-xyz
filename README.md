# FOSS services at farchiver.xyz

Lightweight services to benefit the ecosystem. Designed to work permissionlessly and decentralized, with maintenance-light responsibilities.

Permission granted to clone, fork or copy, as per MIT license.

Backend on Cloudflare Workers + KV. Frontend based on borodut.ch frontend starter template.


## Host-side setup

1. deploy Cloudflare Pages by pointing to this Git repository
    1a. create CNAME DNS record pointing (sub-)domain to the deployment
2. bind KV namespace to variable `KV` in this Pages deployment 
3. call the `initiate` endpoint to pre-populate KV
4. update KV store from existing instances, e.g., [foss.farchiver.xyz](https://foss.farchiver.xyz/hub)


## Local launch

1. Install dependencies with `yarn`
2. Run the server with `yarn start`
