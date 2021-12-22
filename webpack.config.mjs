
import { merge } from 'webpack-merge';

import common from './webpack.common.mjs';
import development from './webpack.development.mjs';
import production from './webpack.production.mjs';


export default () => {

    const __dirname = process.env.init_cwd;
    const env = process.env;

    let config;

    switch(env.node_env) {

        case 'development':
            console.log(`Merging configurations for \'${env.node_env}\' build.`);
            config = merge(
                common(env, __dirname), 
                development(env, __dirname));
            break;

        case 'production':
            console.log(`Merging configurations for \'${env.node_env}\' build.`);
            config = merge(
                common(env, __dirname), 
                production(env, __dirname));
            break;

        default:
            throw new Error(`No matching configuration was found! mode: \'${env.mode}\'`);
    }

    console.log(`Configuration:`, config);
    return config;
}
