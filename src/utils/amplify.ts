import { Amplify } from 'aws-amplify';

export function initAmplify() {
	Amplify.configure({
		Auth: {
			Cognito: {
				identityPoolId: 'us-east-1:ae23c48f-8125-45e6-9a25-d6db54ad9065',
				userPoolClientId: 'an4laitk7o8a5slda3mr20v69',
				userPoolId: 'us-east-1_F9HiLNIFK'
			}
		}
	});
}
