/* @flow */

import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { Avatar } from '../../../base/avatar';

import TimeElapsed from './TimeElapsed';

const useStyles = makeStyles(() => {
    return {
        speakerStatsItem: {
            height: 48,
            padding: '8px 0px'
        },
        speakerStatsAvatar: {
            height: 32
        }

    };
});

/**
 * The type of the React {@code Component} props of {@link SpeakerStatsItem}.
 */
type Props = {

    /**
     * The name of the participant.
     */
    displayName: string,

    /**
     * The object that has as keys the facial expressions of the
     * participant and as values a number that represents the count .
     */
    facialExpressions: Object,

    /**
     * True if the client width is les than 750.
     */
    reduceExpressions: boolean,

    /**
     * True if the facial recognition is not disabled.
     */
    showFacialExpressions: boolean,

    /**
     * The total milliseconds the participant has been dominant speaker.
     */
    dominantSpeakerTime: number,

    /**
     * The id of the user.
     */
    participantId: string,

    /**
     * True if the participant is no longer in the meeting.
     */
    hasLeft: boolean,

    /**
     * True if the participant is currently the dominant speaker.
     */
    isDominantSpeaker: boolean,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function
};

const SpeakerStatsItem = (props: Props) => {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */

    const classes = useStyles();
    const hasLeftClass = props.hasLeft ? 'status-user-left' : '';
    const rowDisplayClass = `speaker-stats-row ${hasLeftClass} ${classes.speakerStatsItem}`;

    return (
        <div
            className = { rowDisplayClass }
            key = { props.participantId } >
            <div className = { `speaker-stats-item__avatar ${classes.speakerStatsAvatar}` }>
                <Avatar
                    className = 'userAvatar'
                    participantId = { props.participantId } />
            </div>
            <div className = 'speaker-stats-item__name-time'>
                <div
                    aria-label = { props.t('speakerStats.speakerStats') }>
                    { props.displayName }
                </div>
                <div
                    aria-label = { props.t('speakerStats.speakerTime') }>
                    <TimeElapsed
                        time = { props.dominantSpeakerTime } />
                </div>
            </div>
            { props.showFacialExpressions
            && (
                <>
                    <div
                        aria-label = { 'Happy' }
                        className = 'speaker-stats-item__expression'>
                        { props.facialExpressions.happy }
                    </div>
                    <div
                        aria-label = { 'Neutral' }
                        className = 'speaker-stats-item__expression'>
                        { props.facialExpressions.neutral }
                    </div>
                    <div
                        aria-label = { 'Sad' }
                        className = 'speaker-stats-item__expression'>
                        { props.facialExpressions.sad }
                    </div>
                    <div
                        aria-label = { 'Surprised' }
                        className = 'speaker-stats-item__expression'>
                        { props.facialExpressions.surprised }
                    </div>
                    { !props.reduceExpressions && (
                        <>
                            <div
                                aria-label = { 'Angry' }
                                className = 'speaker-stats-item__expression'>
                                { props.facialExpressions.angry }
                            </div>
                            <div
                                aria-label = { 'Fearful' }
                                className = 'speaker-stats-item__expression'>
                                { props.facialExpressions.fearful }
                            </div>
                            <div
                                aria-label = { 'Disgusted' }
                                className = 'speaker-stats-item__expression'>
                                { props.facialExpressions.disgusted }
                            </div>
                        </>
                    )}
                </>
            )
            }
        </div>
    );
};

export default SpeakerStatsItem;
