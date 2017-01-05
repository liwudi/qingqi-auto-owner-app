/**
 * Created by ligj on 2016/11/10.
 */

import {
    NativeModules
} from 'react-native';


/**
 * 返回通讯录数据
 * 格式
 *
 *      {
 *          A ： [
 *              {
 *                  name:'xxxs',
 *                  phoneNumbers:['13111112222','123213213213']
 *                  primaryKey:'A'
 *              },
 *              {
 *                  name:'xxxs2',
 *                  phoneNumbers:['13111112222']
 *                  primaryKey:'A'
 *              }
 *          ],
 *          B ： [
 *              {
 *                  name:'xxxs',
 *                  phoneNumbers:['13111112222','123213213213']
 *                  primaryKey:'B'
 *              },
 *              {
 *                  name:'xxxs2',
 *                  phoneNumbers:['13111112222']
 *                  primaryKey:'B'
 *              }
 *          ]
 *      }
 *
 * @returns {Promise.<T>}
 */
export function getContacts() {

}