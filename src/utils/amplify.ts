import { Amplify } from 'aws-amplify';

export function initAmplify() {
	Amplify.configure({
		aws_cognito_identity_pool_id: 'us-east-1:ae23c48f-8125-45e6-9a25-d6db54ad9065',
		aws_cognito_region: 'us-east-1',
		aws_user_pools_id: 'us-east-1_F9HiLNIFK',
		aws_user_pools_web_client_id: 'an4laitk7o8a5slda3mr20v69'
	});
}
