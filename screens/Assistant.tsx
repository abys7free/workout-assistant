import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

const Btn = styled.TouchableOpacity`
	flex: 1;
	justify-content: center;
	align-items: center;
	/* background-color: red; */
`;

const Title = styled.View`
	color: blue;
`;

const AssistantContainer = styled.View<IAssistantContainer>`
	flex: 1;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.backgroundColor};
`

const StatusBar = styled.View`
	position: absolute;
	top: 20px;
	flex-direction: row;
	> {
		font-size: 20px;
		font-weight: 300;
		margin-right: 5px;
	}
`

interface IStatusText extends DefaultTheme {
	isLast?: boolean
}

const StatusText = styled.Text<IStatusText>`
	font-size: 15px;
	margin-right: ${props => props.isLast ? '0px' : '10px'};
	font-weight: 400;
`

const AssistantTextBox = styled.View`
	justify-content: center;
	align-items: center;
`

const TimeLeftText = styled.Text`
	font-size: 40px;
	font-weight: bold;
`

const AssistantText = styled.Text`
	font-size: 20px;
	font-weight: 400;
`


export enum PRGS_STATUS {
	IDLE = 'idle',
	READY = 'ready',
	WORKING = 'working',
	RESTING = 'resting',
	DONE = 'done'
}

export interface IAssistantContainer extends DefaultTheme {
	backgroundColor: string
}



const Assistant: React.FC<NativeStackScreenProps<any, 'Assistant'>> = ({ navigation: { navigate } }) => {

	const [prgsStatus, setPrgsStatus] = useState<PRGS_STATUS>(PRGS_STATUS.IDLE)
	const [timer, setTimer] = useState(0);
	const timeLeft = useMemo(() => {
		return timer.toString()
	}, [timer])

	const schedule: {
		[index: string]: number
	} = {
		ready: 5,
		working: 10,
		resting: 8,
		set: 3
	}

	const makeSequence = (schedule: {
		[index: string]: number
	}): { type: PRGS_STATUS, timer: number }[] => {
		const sequence = []

		if (schedule.ready) {
			sequence.push({
				type: PRGS_STATUS.READY,
				timer: schedule[PRGS_STATUS.READY]
			})
		}

		for (let set = 0; set < schedule.set; set++) {
			if (set === (schedule.set - 1)) {
				sequence.push({
					type: PRGS_STATUS.WORKING,
					timer: schedule[PRGS_STATUS.WORKING]
				})
			} else {
				sequence.push(...[
					{
						type: PRGS_STATUS.WORKING,
						timer: schedule[PRGS_STATUS.WORKING]
					},
					{
						type: PRGS_STATUS.RESTING,
						timer: schedule[PRGS_STATUS.RESTING]
					},
				])
			}
		}
		return sequence
	}

	const statusObj: {
		[index: string]: {
			title?: string,
			text?: string,
			color?: string
		}
	} = {
		idle: {
			title: 'Tabata',
			text: 'Tab to Start',
			color: '#4bcffa'
		},
		ready: {
			color: '#ffa801',
			text: 'Get Ready!'
		},
		working: {
			text: 'Go!',
			color: '#0be881'
		},
		resting: {
			text: 'Rest',
			color: '#ffc048'
		},
		pause: {
			text: 'paused :(',
			color: '#d2dae2'
		}
	}


	const [intervalId, setIntervalId] = useState<number>(0);


	const countDown = useCallback(async (timer: number) => {
		return await new Promise<void>(resolve => {
			setTimer(timer)
			let time = 1
			const intervalId = setInterval(() => {
				if (timer === time) {
					clearInterval(intervalId)
					resolve();
				}
				setTimer(prev => prev - 1)
				time++
			}, 1000)
		})
	}, [timer])


	const onClickHandler = useCallback(async () => {
		for (let seq of makeSequence(schedule)) {
			setPrgsStatus(seq.type);
			await countDown(seq.timer)
		}
		setPrgsStatus(PRGS_STATUS.IDLE);
	}, [timer, setTimer])

	// useEffect(() => {
	// 	if (timer <= 0) {
	// 		clearInterval(intervalId)
	// 	}
	// console.log('timer:', timer)
	// }, [timer])

	return (

		<AssistantContainer backgroundColor={statusObj[prgsStatus].color}>
			<Btn
				onPress={onClickHandler}
			>
				<StatusBar>
					<StatusText

					>{`ready: ${schedule['ready']}`}</StatusText>
					<StatusText

					>{`set: ${schedule['set']}`}</StatusText>
					<StatusText

					>{`working: ${schedule['working']}`}</StatusText>
					<StatusText
						isLast={true}
					>{`rest: ${schedule['resting']}`}</StatusText>
				</StatusBar>

				<AssistantTextBox>
					{prgsStatus !== PRGS_STATUS.IDLE && <TimeLeftText>
						{timeLeft} S
					</TimeLeftText>}
					<AssistantText>
						{statusObj[prgsStatus].text}
					</AssistantText>
				</AssistantTextBox>
			</Btn>
		</AssistantContainer >
	);
};

export default Assistant;
