require('dotenv').config();
const CronJob = require('cron').CronJob;
const AWS = require('aws-sdk');

const SESConfig = {
	apiVersion: '2010-12-01',
	region: process.env.AWS_SES_REGION,
	accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
};

exports.verifyEmails = (req, res) => {
    let ses = new AWS.SES(SESConfig);
    let emails = [
        '//EMAILS TO VERIFY',
    ];
    emails.forEach(email => {
        let params = {
            EmailAddress: email,
		};
        ses.verifyEmailIdentity(params, (err, data) => {
            if (err) console.log(err, err.stack);
			else console.log(data);
        });
    });
}

exports.cronEmail = () => {
	console.log('before job installation');
	//CronJob(sec min hour dayOfMonth month dayOfWeek, callback)
	//Asterisk: *
	//Ranges: 1-3,5
	//Steps: */1
	const hour = Math.floor(Math.random()*23);
	const day1 = Math.floor(Math.random()*6);
	let day2 = Math.floor(Math.random()*6);
	while (day1 === day2) {
		day2 = Math.floor(Math.random()*6);
	}
	console.log(`0 0 ${hour} * * ${day1},${day2}`);
	const cron = new CronJob(`0 0 ${hour} * * ${day1},${day2}`, () => {
		let d = new Date();
		console.log('Email sent at: ', d);
		let params = {
			Destination: {
				CcAddresses: [],
				ToAddresses: [
					'EMAIL ADDRESS',
				],
			},
			Message: {
				Body: {
					Html: {
						Charset: "UTF-8",
						Data: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

						<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
						<head>
						<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
						<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
						<meta content="width=device-width" name="viewport"/>
						<!--[if !mso]><!-->
						<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
						<!--<![endif]-->
						<title></title>
						<!--[if !mso]><!-->
						<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"/>
						<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
						<!--<![endif]-->
						<style type="text/css">
								body {
									margin: 0;
									padding: 0;
								}
						
								table,
								td,
								tr {
									vertical-align: top;
									border-collapse: collapse;
								}
						
								* {
									line-height: inherit;
								}
						
								a[x-apple-data-detectors=true] {
									color: inherit !important;
									text-decoration: none !important;
								}
							</style>
						<style id="media-query" type="text/css">
								@media (max-width: 670px) {
						
									.block-grid,
									.col {
										min-width: 320px !important;
										max-width: 100% !important;
										display: block !important;
									}
						
									.block-grid {
										width: 100% !important;
									}
						
									.col {
										width: 100% !important;
									}
						
									.col>div {
										margin: 0 auto;
									}
						
									img.fullwidth,
									img.fullwidthOnMobile {
										max-width: 100% !important;
									}
						
									.no-stack .col {
										min-width: 0 !important;
										display: table-cell !important;
									}
						
									.no-stack.two-up .col {
										width: 50% !important;
									}
						
									.no-stack .col.num4 {
										width: 33% !important;
									}
						
									.no-stack .col.num8 {
										width: 66% !important;
									}
						
									.no-stack .col.num4 {
										width: 33% !important;
									}
						
									.no-stack .col.num3 {
										width: 25% !important;
									}
						
									.no-stack .col.num6 {
										width: 50% !important;
									}
						
									.no-stack .col.num9 {
										width: 75% !important;
									}
						
									.video-block {
										max-width: none !important;
									}
						
									.mobile_hide {
										min-height: 0px;
										max-height: 0px;
										max-width: 0px;
										display: none;
										overflow: hidden;
										font-size: 0px;
									}
						
									.desktop_hide {
										display: block !important;
										max-height: none !important;
									}
								}
							</style>
						</head>
						<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #E2E2E2;">
						<!--[if IE]><div class="ie-browser"><![endif]-->
						<table bgcolor="#E2E2E2" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #E2E2E2; width: 100%;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td style="word-break: break-word; vertical-align: top;" valign="top">
						<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#E2E2E2"><![endif]-->
						<div style="background-color:transparent;">
						<div class="block-grid two-up" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
						<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
						<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
						<!--[if (mso)|(IE)]><td align="center" width="325" style="background-color:transparent;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
						<div class="col num6" style="min-width: 320px; max-width: 325px; display: table-cell; vertical-align: top; width: 325px;">
						<div style="width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
						<div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
						<div style="font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 12px; line-height: 14px; color: #555555;">
						<p style="font-size: 14px; line-height: 69px; margin: 0;"><span style="font-size: 58px;">Suira</span></p>
						</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td><td align="center" width="325" style="background-color:transparent;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
						<div class="col num6" style="min-width: 320px; max-width: 325px; display: table-cell; vertical-align: top; width: 325px;">
						<div style="width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<div class="mobile_hide">
						<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid transparent; height: 0px;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
						</tr>
						</tbody>
						</table>
						</td>
						</tr>
						</tbody>
						</table>
						</div>
						<table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
						<table activate="activate" align="right" alignment="alignment" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: undefined; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" to="to" valign="top">
						<tbody>
						<tr align="right" style="vertical-align: top; display: inline-block; text-align: right;" valign="top">
						<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 5px;" valign="top"><a href="https://www.facebook.com/" target="_blank"><img alt="Facebook" height="32" src="https://image.flaticon.com/icons/png/512/665/665209.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Facebook" width="32"/></a></td>
						<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 5px;" valign="top"><a href="https://instagram.com/" target="_blank"><img alt="Instagram" height="32" src="https://www.flaticon.com/premium-icon/icons/svg/665/665211.svg" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Instagram" width="32"/></a></td>
						</tr>
						</tbody>
						</table>
						</td>
						</tr>
						</tbody>
						</table>
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
						</div>
						</div>
						</div>
						<div style="background-color:transparent;">
						<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
						<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
						<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
						<!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
						<div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
						<div style="width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
						<!--[if mso]></td></tr></table><![endif]-->
						</div>
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
						</div>
						</div>
						</div>
						<div style="background-color:transparent;">
						<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;">
						<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
						<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
						<!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#FFFFFF;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
						<div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
						<div style="width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 0px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
						<div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:0px;padding-left:10px;">
						<div style="line-height: 14px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 12px; color: #555555;">
						<p style="line-height: 33px; font-size: 12px; text-align: center; margin: 0;"><span style="color: #000000; font-size: 28px;">Abel,</span></p>
						</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 0px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
						<div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:0px;padding-left:10px;">
						<div style="line-height: 14px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 12px; color: #555555;">
						<p style="line-height: 26px; font-size: 12px; text-align: center; margin: 0;"><span style="font-size: 22px;">we just found an opportunity for you.</span></p>
						</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid #BBBBBB;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
						</tr>
						</tbody>
						</table>
						</td>
						</tr>
						</tbody>
						</table>
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 0px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
						<div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:0px;padding-left:10px;">
						<div style="line-height: 14px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 12px; color: #555555;">
						<p style="line-height: 36px; font-size: 12px; text-align: center; margin: 0;"><span style="font-size: 30px;">Diseño de Logo para Plataforma Web</span></p>
						</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<div align="center" class="img-container center fixedwidth" style="padding-right: 20px;padding-left: 20px;">
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 20px;padding-left: 20px;" align="center"><![endif]-->
						<div style="font-size:1px;line-height:20px"> </div><img align="center" alt="Image" border="0" class="center fixedwidth" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/BeeFree/beefree-ist8mnrpvt/5-Signs-You-Need-to-Hire-a-Graphic-Designer-1.jpg" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 390px; display: block;" title="Image" width="390"/>
						<div style="font-size:1px;line-height:20px"> </div>
						<!--[if mso]></td></tr></table><![endif]-->
						</div>
						<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid #BBBBBB;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
						</tr>
						</tbody>
						</table>
						</td>
						</tr>
						</tbody>
						</table>
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
						<div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
						<div style="font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 12px; line-height: 14px; color: #555555;">
						<p style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
						</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid #BBBBBB; height: 0px;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
						</tr>
						</tbody>
						</table>
						</td>
						</tr>
						</tbody>
						</table>
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
						<div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
						<div style="font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; font-size: 12px; line-height: 14px; color: #555555;">
						<p style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;">Based on your tags:</p>
						</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
						</div>
						</div>
						</div>
						<div style="background-color:transparent;">
						<div class="block-grid four-up" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
						<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
						<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
						<!--[if (mso)|(IE)]><td align="center" width="162" style="background-color:transparent;width:162px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;background-color:#FFFFFF;"><![endif]-->
						<div class="col num3" style="max-width: 320px; min-width: 162px; display: table-cell; vertical-align: top; width: 162px;">
						<div style="background-color:#FFFFFF;width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:31.5pt; width:76.5pt; v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#555555"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Trebuchet MS', Tahoma, sans-serif; font-size:16px"><![endif]-->
						<div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#555555;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #555555;border-right:1px solid #555555;border-bottom:1px solid #555555;border-left:1px solid #555555;padding-top:5px;padding-bottom:5px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;">
						<span style="font-size: 16px; line-height: 32px;"><em>Design</em></span>
						</span></div>
						<!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
						</div>
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td><td align="center" width="162" style="background-color:transparent;width:162px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;background-color:#FFFFFF;"><![endif]-->
						<div class="col num3" style="max-width: 320px; min-width: 162px; display: table-cell; vertical-align: top; width: 162px;">
						<div style="background-color:#FFFFFF;width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:31.5pt; width:87pt; v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#555555"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Trebuchet MS', Tahoma, sans-serif; font-size:16px"><![endif]-->
						<div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#555555;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #555555;border-right:1px solid #555555;border-bottom:1px solid #555555;border-left:1px solid #555555;padding-top:5px;padding-bottom:5px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;">
						<span style="font-size: 16px; line-height: 32px;"><em><span style="font-size: 16px; line-height: 32px;">Graphics</span></em></span>
						</span></div>
						<!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
						</div>
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td><td align="center" width="162" style="background-color:transparent;width:162px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;background-color:#FFFFFF;"><![endif]-->
						<div class="col num3" style="max-width: 320px; min-width: 162px; display: table-cell; vertical-align: top; width: 162px;">
						<div style="background-color:#FFFFFF;width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:31.5pt; width:103.5pt; v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#555555"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Trebuchet MS', Tahoma, sans-serif; font-size:16px"><![endif]-->
						<div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#555555;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #555555;border-right:1px solid #555555;border-bottom:1px solid #555555;border-left:1px solid #555555;padding-top:5px;padding-bottom:5px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;">
						<span style="font-size: 16px; line-height: 32px;"><em>Advertising</em></span>
						</span></div>
						<!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
						</div>
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td><td align="center" width="162" style="background-color:transparent;width:162px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;background-color:#FFFFFF;"><![endif]-->
						<div class="col num3" style="max-width: 320px; min-width: 162px; display: table-cell; vertical-align: top; width: 162px;">
						<div style="background-color:#FFFFFF;width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:31.5pt; width:106.5pt; v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#555555"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Trebuchet MS', Tahoma, sans-serif; font-size:16px"><![endif]-->
						<div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#555555;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #555555;border-right:1px solid #555555;border-bottom:1px solid #555555;border-left:1px solid #555555;padding-top:5px;padding-bottom:5px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;">
						<span style="font-size: 16px; line-height: 32px;"><em>Web design</em></span>
						</span></div>
						<!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
						</div>
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
						</div>
						</div>
						</div>
						<div style="background-color:transparent;">
						<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;">
						<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
						<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
						<!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#FFFFFF;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
						<div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
						<div style="width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid #BBBBBB; height: 0px;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
						</tr>
						</tbody>
						</table>
						</td>
						</tr>
						</tbody>
						</table>
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
						</div>
						</div>
						</div>
						<div style="background-color:transparent;">
						<div class="block-grid three-up" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;">
						<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
						<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
						<!--[if (mso)|(IE)]><td align="center" width="216" style="background-color:#FFFFFF;width:216px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
						<div class="col num4" style="max-width: 320px; min-width: 216px; display: table-cell; vertical-align: top; width: 216px;">
						<div style="width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center fixedwidth" src="https://image.flaticon.com/icons/svg/1077/1077976.svg" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 108px; display: block;" title="Image" width="108"/>
						<!--[if mso]></td></tr></table><![endif]-->
						</div>
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 0px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
						<div style="color:#eb3f1c;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:0px;padding-left:10px;">
						<div style="font-size: 16px; line-height: 19px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; color: #eb3f1c;">
						<p style="font-size: 16px; line-height: 19px; text-align: center; margin: 0;"><span style="color: #999999; font-size: 16px; line-height: 19px;"><strong>Payment</strong></span></p>
						</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 80%; border-top: 1px dashed #FFFFFF; height: 0px;" valign="top" width="80%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
						</tr>
						</tbody>
						</table>
						</td>
						</tr>
						</tbody>
						</table>
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
						<div style="color:#FFFFFF;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
						<div style="font-size: 14px; line-height: 16px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; color: #FFFFFF;">
						<p style="font-size: 14px; line-height: 28px; text-align: center; margin: 0;"><span style="color: #333333; font-size: 24px;">$80</span></p>
						</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td><td align="center" width="216" style="background-color:#FFFFFF;width:216px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
						<div class="col num4" style="max-width: 320px; min-width: 216px; display: table-cell; vertical-align: top; width: 216px;">
						<div style="width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center fixedwidth" src="https://image.flaticon.com/icons/svg/137/137866.svg" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 108px; display: block;" title="Image" width="108"/>
						<!--[if mso]></td></tr></table><![endif]-->
						</div>
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 0px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
						<div style="color:#eb3f1c;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:0px;padding-left:10px;">
						<div style="font-size: 16px; line-height: 19px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; color: #eb3f1c;">
						<p style="font-size: 16px; line-height: 19px; text-align: center; margin: 0;"><span style="color: #808080; font-size: 16px; line-height: 19px;"><strong>Date</strong></span></p>
						</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 80%; border-top: 1px dashed #FFFFFF; height: 0px;" valign="top" width="80%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
						</tr>
						</tbody>
						</table>
						</td>
						</tr>
						</tbody>
						</table>
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
						<div style="color:#FFFFFF;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
						<div style="font-size: 14px; line-height: 16px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; color: #FFFFFF;">
						<p style="font-size: 14px; line-height: 26px; text-align: center; margin: 0;"><span style="color: #333333; font-size: 22px;">August 12 </span></p>
						</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td><td align="center" width="216" style="background-color:#FFFFFF;width:216px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:20px;"><![endif]-->
						<div class="col num4" style="max-width: 320px; min-width: 216px; display: table-cell; vertical-align: top; width: 216px;">
						<div style="width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:20px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center fixedwidth" src="https://image.flaticon.com/icons/svg/1159/1159633.svg" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 108px; display: block;" title="Image" width="108"/>
						<!--[if mso]></td></tr></table><![endif]-->
						</div>
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 0px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
						<div style="color:#eb3f1c;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:0px;padding-left:10px;">
						<div style="font-size: 16px; line-height: 19px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; color: #eb3f1c;">
						<p style="font-size: 16px; line-height: 19px; text-align: center; margin: 0;"><span style="font-size: 16px; line-height: 19px; color: #808080;"><strong>Uploaded by</strong></span></p>
						</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 80%; border-top: 1px dashed #FFFFFF; height: 0px;" valign="top" width="80%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
						</tr>
						</tbody>
						</table>
						</td>
						</tr>
						</tbody>
						</table>
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
						<div style="color:#FFFFFF;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
						<div style="font-size: 14px; line-height: 16px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; color: #FFFFFF;">
						<p style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;"><span style="text-decoration: underline; font-size: 14px; line-height: 16px; color: #333333;"><span style="font-size: 22px; line-height: 26px;">Mateo Jiménez</span></span></p>
						</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
						</div>
						</div>
						</div>
						<div style="background-color:transparent;">
						<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;">
						<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
						<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
						<!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#FFFFFF;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
						<div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
						<div style="width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:37.5pt; width:148.5pt; v-text-anchor:middle;" arcsize="29%" stroke="false" fillcolor="#3B3187"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Trebuchet MS', Tahoma, sans-serif; font-size:20px"><![endif]-->
						<div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#3B3187;border-radius:14px;-webkit-border-radius:14px;-moz-border-radius:14px;width:auto; width:auto;;border-top:1px solid #3B3187;border-right:1px solid #3B3187;border-bottom:1px solid #3B3187;border-left:1px solid #3B3187;padding-top:5px;padding-bottom:5px;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:20px;display:inline-block;">
						<span style="font-size: 16px; line-height: 32px;"><span style="font-size: 20px; line-height: 40px;">I am interested</span></span>
						</span></div>
						<!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
						</div>
						<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid #BBBBBB; height: 0px;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
						</tr>
						</tbody>
						</table>
						</td>
						</tr>
						</tbody>
						</table>
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
						</div>
						</div>
						</div>
						<div style="background-color:transparent;">
						<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
						<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
						<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
						<!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
						<div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
						<div style="width:100% !important;">
						<!--[if (!mso)&(!IE)]><!-->
						<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
						<!--<![endif]-->
						<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
						<div style="color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
						<div style="font-size: 12px; line-height: 14px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555;">
						<p style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;">Copyright @Suira 2019. All rights reserved.</p>
						</div>
						</div>
						<!--[if mso]></td></tr></table><![endif]-->
						<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="30" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 0px solid transparent; height: 30px;" valign="top" width="100%">
						<tbody>
						<tr style="vertical-align: top;" valign="top">
						<td height="30" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
						</tr>
						</tbody>
						</table>
						</td>
						</tr>
						</tbody>
						</table>
						<!--[if (!mso)&(!IE)]><!-->
						</div>
						<!--<![endif]-->
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
						</div>
						</div>
						</div>
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						</td>
						</tr>
						</tbody>
						</table>
						<!--[if (IE)]></div><![endif]-->
						</body>
						</html>`
					}    
				},
				Subject: {
					Charset: 'UTF-8',
					Data: `Solo Millos y suira.com`
				}
			},
			Source: 'SOURCE ADDRESS',
			ReplyToAddresses: [
				'REPLY TO ADDRESS',
			],
		};
	
		let sendPromise = new AWS.SES(SESConfig).sendEmail(params).promise();
	
		sendPromise.then((data) => {
			console.log(data.messageId);
		}).catch((err) => {
			console.log(err, err.stack);
		});
	});
	console.log('after job installation');
	cron.start();
}