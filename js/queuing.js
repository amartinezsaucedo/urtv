/*
Copyright 2019 Google LLC. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

const LOG_QUEUE_TAG = 'Queue';

/**
 * Debug Logger
 */
const castDebugLogger = cast.debug.CastDebugLogger.getInstance();

if (!castDebugLogger.loggerLevelByTags) {
  castDebugLogger.loggerLevelByTags = {};
}
/**
 * Set verbosity level for custom tag.
 * Enable log messages for error, warn and info.
 */
castDebugLogger.loggerLevelByTags[LOG_QUEUE_TAG] =
  cast.framework.LoggerLevel.INFO;

class CastQueue extends cast.framework.QueueBase {
  constructor() {
    super();
  }

  /**
  * Initializes the queue.
  * @param {!cast.framework.messages.LoadRequestData} loadRequestData
  * @return {!cast.framework.messages.QueueData}
  */
  initialize(loadRequestData) {
    if (loadRequestData) {
      let queueData = loadRequestData.queueData;

      // Create a new queue with media from load request if one doesn't exist.
      if (!queueData || !queueData.items || !queueData.items.length) {
        castDebugLogger.info(LOG_QUEUE_TAG,
          'Creating a new queue with media from the load request');
        queueData = new cast.framework.messages.QueueData();
        let item = new cast.framework.messages.QueueItem();
        item.media = loadRequestData.media;
        queueData.items = [item];
      }
      return queueData;
    }
 }
};

export {
  CastQueue
};
