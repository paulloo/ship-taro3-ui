import React from 'react';
import PropTypes, {InferProps } from 'prop-types'
// @ts-ignore 
import { AtProgressProps } from 'types/progress'
import classNames from 'classnames'
import { View, Text } from '@tarojs/components';
import AtComponent from '../../common/component';


export default class AtProgress extends AtComponent<AtProgressProps> {
    public static defaultProps: AtProgressProps
    public static propTypes: InferProps<AtProgressProps>
    constructor(props: AtProgressProps) {
        super(props);
        this.state = {
        };
    }

    public render(): JSX.Element {
        const { color } = this.props
        let { percent } = this.props
        const { strokeWidth, status, isHidePercent } = this.props

        if (typeof percent !== 'number') {
        percent = 0
        }

        if (percent < 0) {
        percent = 0
        } else if (percent > 100) {
        percent = 100
        }

        const rootClass = classNames(
        'at-progress',
        {
            [`at-progress--${status}`]: !!status
        },
        this.props.className
        )
        const iconClass = classNames('at-icon', {
        'at-icon-close-circle': status === 'error',
        'at-icon-check-circle': status === 'success',
        })

        const progressStyle = {
        width: percent && `${+percent}%`,
        height: strokeWidth && `${+strokeWidth}px`,
        backgroundColor: color
        }
        return (
            <View className={rootClass}>
                <View className='at-progress__outer'>
                <View className='at-progress__outer-inner'>
                    <View
                      className='at-progress__outer-inner-background'
                      style={progressStyle}
                    />
                </View>
                </View>

                {!isHidePercent && (
                <View className='at-progress__content'>
                    {!status || status === 'progress' ? `${percent}%` : <Text className={iconClass}></Text>}
                </View>
                )}
            </View>
        );
    }
}

AtProgress.defaultProps = {
    color: '',
    status: 'progress',
    percent: 0,
    strokeWidth: 2,
    isHidePercent: false
}

AtProgress.propTypes = {
    color: PropTypes.string,
    status: PropTypes.string,
    percent: PropTypes.number,
    strokeWidth: PropTypes.number,
    isHidePercent: PropTypes.bool
  }
  