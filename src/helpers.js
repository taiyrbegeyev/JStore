// sort by creation date in desc order
export const compare_creationDate = (postA, postB) => {
  if (postA.creationDate > postB.creationDate) {
    return -1
  }
  if (postA.creationDate < postB.creationDate) {
    return 1
  }
  return 0
}

// sort by sold date in desc order
export const compare_soldDate = (postA, postB) => {
  if (postA.soldDate > postB.soldDate) {
    return -1
  }
  if (postA.soldDate < postB.soldDate) {
    return 1
  }
  return 0
}

export const cutOffString = (str, limit) => {
  return str.substr(0, limit)
}

export const displayDate = (timeStamp) => {
  // split by either GMT or UTC
  let time = timeStamp.split('GMT')
  time = time[0].split('UTC')
  // remove day of the week in front
  time = time[0].slice(4)
  
  return time
}

export const cutFullName = (fullName) => {
  // split fullName by spaces
  let array_fullName = fullName.split(" ")
  array_fullName = array_fullName.map((word) => {
    return word.charAt(0).toUpperCase()
  })
  console.log(array_fullName)
  if (array_fullName.length === 1) {
    return array_fullName[0]
  }
  else {
    return array_fullName[0] + array_fullName[array_fullName.length - 1]
  }
}

export const validatePhoneNumber = (phoneNumber) => {
  // truncate phone number first
  phoneNumber = phoneNumber.replace(/\s/g, '');

  // remove all non-digits
  const sanitized_phoneNumber = phoneNumber.replace(/\D/g,'')
  // if number doesn't contain any characters except numbers
  if (sanitized_phoneNumber === phoneNumber && sanitized_phoneNumber.length >= 4 && sanitized_phoneNumber.length <= 15) {
    return true
  }
  return false
}

export const generateWhatsAppLink = (phoneNumber, fullName, itemName, link, imageUrl) => {
  const sanitized_phoneNumber = phoneNumber.replace(/\D/g,'')
  console.log(sanitized_phoneNumber)
  return `https://api.whatsapp.com/send?phone=${sanitized_phoneNumber}&text=[JStore]%20${itemName}%0D%0A%0D%0AHi! I'm contacting you by clicking on the WhatsApp button of JStore. My name is ${fullName} and I'm interested in the following item:%0D%0A${link}`
}

export const generateeMail = (email, fullName, itemName, link, imageUrl) => {
  return `mailto:${email}?subject=[JStore]%20${itemName}&body=Hi!%20I'm%20contacting%20you%20by%20clicking%20on%20the%20Email%20button%20of%20JStore.%20I'm%20interested%20in%20the%20following%20item:%0D%0A${link}%0D%0A%0D%0ASincerely,%0D%0A${fullName}`
}

export const termsAndConditions = () => {
return `
PLEASE READ THESE TERMS OF SERVICE CAREFULLY. THESE TERMS INCLUDE A MANDATORY ARBITRATION PROVISION AND CLASS ACTION WAIVER PROVISION, WHICH AFFECT YOUR RIGHTS ABOUT HOW TO RESOLVE ANY DISPUTE WITH JSTORE. BY ACCESSING OUR WEBSITE, AND OUR MOBILE APPS, YOU AGREE TO BE BOUND BY ALL TERMS DESCRIBED HEREIN AND ALL TERMS INCORPORATED BY REFERENCE (“Terms and Conditions”). IF YOU DO NOT AGREE TO ALL OF THESE TERMS, DO NOT ACCESS OR USE THE JSTORE SERVICE.
YOU ACKNOWLEDGE AND AGREE THAT THERE ARE RISKS ASSOCIATED WITH UTILIZING AN INTERNET-BASED MARKETPLACE AND INTERACTING WITH OTHER USERS IN PERSON.

These Terms and Conditions apply to your access to and use of the JStore Service provided by JStore. Additional terms (including, but not limited to, the terms of social media services, etc.) may apply to particular functionalities and features related to the JStore Service.
This agreement relates to the App and the Website (together with any materials and services contained therein) as the "Service". Please note that this agreement incorporates, by reference, any additional terms made public by the JStore through the service or otherwise made available to you by JStore.
From this version onwards, JStore will introduce new features that may only be available to certain users or all. Provisions of these Terms of Service relating to such new features may not apply to all users.

1. BUSINESS SCOPE AND USAGE OF JSTORE SERVICES

1.1 Scope of JStore
The JStore platform (supported with Android, iOS (coming soon), and Web app) is an online marketplace that enables registered users from Jacobs University Bremen to publish Products and Goods on the JStore platform (“ Buy” ) and to communicate and transact directly with Customers and Students that are seeking to buy the goods and products (Members using Buy Services are “ Buyers/Customers ”). Members and third parties who offer Services are “ Sellers/Merchants ” and the services they offer are “ Sell ”.

2. USERS AND PERSONAL RIGHTS

2.1 Users eligibility
ONLY USERS WHO ARE RELATED TO JACOBS UNIVERSITY BREMEN ARE ALLOWED TO ACCESS THE SERVICES THAT JSTORE PROVIDE. The JStore Service is not targeted towards anyone not related to above criteria. JStore has the rights to cancel the aforementioned terms, and allow other potential users to access our Services. You further represent and warrant that you: (a) have not previously been suspended or removed from using the JStore Services; (b) are legally permitted to, and do, live in the Germany, and the European Union, and (c) may enter into this agreement without violating any other agreement to which you are a party. If you are registering to use the JStore Service on behalf of a legal entity, you further represent and warrant that (i) such legal entity is duly organized and validly existing under the applicable laws of the jurisdiction of its organization, and (ii) you are duly authorized by such legal entity to act on its behalf. 

2.2 Usernames, Emails, and Phone Numbers.
You must register in jstore.xyz or its mobile apps  to use the Service in whole or in part. We may decline your username, emails, phone numbers or other information you submit to us upon registration or request that you change it. Currently, we offer our Services for only user from Jacobs University Bremen; that means, you should register only with your university email. Your username, email, and phone number are for your personal use only and should be treated confidentially. You are responsible for any use or misuse of your username or password, and you must promptly notify us of any theft or unauthorized use of your username, email, or phone number. 

2.3 Personal data and security
The JStore app stores and processes personal data that you have provided to us, in order to provide our Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the JStore app won’t work properly or at all. Your submission of data through the Service is subject to the JStore’s Privacy Policy ("Privacy Policy"). You represent and warrant that all data provided to you in connection with the Service, including product offerings and other submissions (as defined below), are and will remain accurate, complete, and that you retain and update such information as necessary. 

2.4 Liability and transaction process
JStore does not take responsibility for any kind of irresponsible behavior, mistreatment, personal grudges from any buyer or seller during the transaction process. It is advisable to bring friends or any acquaintances during these process to prevent any unforeseen circumstances. However, JStore is always aiming to provide security, safety, and reliability amongst our users with a priority of better sense of community. 

3. COPYRIGHTS AND TRADEMARKS 

3.1 JStore copyrights and trademarks
By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to JStore. 

3.2. Violation to JStore copyrights and trademarks 
By violating the aforementioned section of copyrights and trademarks terms and conditions, JStore has the right to proceed any violation of our business operations to court and other legal aspects. 

4. PAYMENT AND OFFERS
4.1 Efficiency and current payment 
JStore is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its Services, at any time and for any reason. We will never charge you for the app or its Services without making it very clear to you exactly what you’re paying for. JStore team is working to provide the best, safe, most convenient way of buying and selling through any of the payment platforms. JStore will be transparent, when these transaction fees or any commission fees are implemented.

4.2 Refunds, returns, and JStore
JStore is not responsible for request of refunds and returns by the buyers. Any requests of refunds and returns must be held between sellers and buyers through our messages functionalities. It is bound on the sellers’ decision to allow the buyers to refund or return the purchased goods. The sellers must make it clear to the buyers whether it is allowed or not when the purchase process occurs.

4.3 Product offers
JStore offers universal platform and app that includes the Service of a forum community, where users can post and browse offers for items and commodities, including used items ("Goods", “Products”, “Commodities”). Such offers and products are provided by users and not by us. JStore neither sells products nor provides them in any other way, and we neither buy products nor do we acquire them in any other way. JStore is not broker of the sale, purchase or transport of products. We are neither responsible for nor liable for offers or products, for transfers or transports in connection with products, including delivery of products and payments for products, or for disputes between users regarding such offers or products. Please use caution and caution when buying a product, Neither the availability of such offers through the Service nor promotional offers we make to the “User” who has published such an offer implies our endorsement of the product offered, the manufacturer of the respective product or a partnership with the respective manufacturer. We make no guarantee as to any products, offers or manufacturers of products. The information and availability of a product may be changed at any time without notice. You must comply with all applicable laws regarding the marketing, promotion, sale, purchase, delivery, receipt, possession, and use of products. We reserve the right to remove any product offer without giving any reason, due to concerns of inappropriateness, company’s needs, and other circumstances. You affirm that you have the necessary authority and permission to create product offerings and to carry out a transaction or transfer in connection with a product, and have the proper consent of your parent or guardian if you are underage. The age of majority (legal age) begins in Germany with the completion of the 18th year of life. 

5. APP AND SERVICES 

5.1 App functionality 
You should be aware that there are certain things that JStore will not take responsibility and liability for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but JStore cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left. 

5.2 Usage of mobile data
If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.

5.3 Web-based, iOS, Android app update 
With respect to JStore’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. JStore accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app. 

6. PERSONAL AND COMMUNITY STANDARDS 

6.1 Personal responsibility and community standards 
Along the same lines, JStore cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, JStore cannot accept responsibility. JStore has created a community in which we part with old things. However, we also believe that it is important to stick to the values we have learned as children that is accepted by common norms. By that we mean the basic things: treat others the way you want to be treated, and stick to your promises. Remember, most of the people you talk to JStore are your university colleagues and space. JStore forbids messages that are designed to harass, intimidate, threaten, or insult other users, and we forbid things that promote or support acts of violence. Hate speech is absolutely unacceptable within our corporate standards.

6.2 Community, Fraud and Trust 
You agree to comply with JStore Community Guidelines that we may update from time to time. The community guidelines include our list of prohibited products and our rules of conduct. JStore makes it easy to find great deals in your university space, but we can not do it alone. Every trade requires trust, and we require your contribution for the society too. Present yourself and the things you buy or sell on JStore, accurately, reliably and decently. Fraud attempts and other cheating materials will not be tolerated. JStore forbids the attempts to lure users away from JStore such as to university emails and to other services. JStore requires sellers and buyers to be fair when negotiating prices, and only place items at prices that you are willing to sell. We don’t accept blurred photos to trick other buyers; we expect photos to be clear and accurate that well-represent the item you are selling. We forbid to use any manufacturer photos or photos that do not show the current state of the item. 

6.3 Monitoring and prohibition of submitted listings
Our team may (without being obligated to) monitor, modify, change or remove any submissions before or after their publication in our platform, or analyze your access to your use our Service. We may, for any reason and for any purpose, disclose to third parties data relating to your access to and use of the Service and the circumstances of such access or use. We prohibit some items to be listed in our community:

1) Taxi/car rides 
2) Private flea markets 
3) Financial services (tax or financial advice) 
4) Multiple offers of the same product 
5) Bulk news without the intention to buy or sell items on JStore 
6) All weapons, accessories and ammunition 
7) Airsoft, BB or other novel firearms that have no orange safety cap 
8) Taser 
9) Fireworks
10) Pesticides, tear gas and other dangerous chemicals and controlled substances 
11) Lottery tickets and other games of chance or gambling 
12) Things that have been acquired through government support
13) Sexual content, sex toys or other things that show explicit nudity 
14) Illegal drugs
15) Live animals (including corals)
16) Fossils Animal skins and bones of endangered or protected species
17) Human services
18) Job offers
19) Cleaning services
20) Coaching

Failing to follow the policies of this section may lead to serious offense and permanent blockage of you in our platform.

7. AVAILABILITY

7.1 Availability and updates
At some point, we may wish to update the app. The app is currently available on Android, iOS (coming soon) and web-based app at jstore.xyz – the requirements for both systems (and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. JStore does not promise that it will always update the app so that it is relevant to you and/or works with the iOS/Android version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.

8. AGREEMENT TO ALL OF TERMS AND CONDITIONS 

8.1 Agreement 
I hereby agree to all of the JStore Terms and Conditions, and will adhere to all of the changes and aforementioned terms that are emphasized for better usage, community atmosphere, and prevention of unexpected circumstances. 

8.2 Changes to this Terms and Conditions
We may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Terms and Conditions on this page. These changes are effective immediately after they are posted on this page.

8.3 Violation and failure to meet the terms
Failing to meet our terms and conditions is a violation of our business operations and scope, and JStore will take serious actions that are against our corporation standards, terms, and rights.
`
}

export const privacyPolicy = () => {
return (
`
This Privacy Policy, outlined by JStore, explains how information about you is collected, used and disclosed by jstore.xyz (hereafter “JStore”, “our,” “we,” or “us”). This Privacy Policy applies to information we collect when you use our website, mobile applications and other online services (collectively, the “JStore Service”) or when you otherwise interact with us. We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with more prominent notice (such as adding a statement to our homepage or sending you an email notification). We encourage you to review the Privacy Policy whenever you access the JStore Service to stay informed about our information practices and the ways you can help protect your privacy. JStore respects your privacy and wants to make you understand what we collect, why we collect it and what we do with it. Please take the time to read the privacy policy carefully. By providing us with your personal information, you agree to this Privacy Policy. If you have any questions, complaints or comments about this Privacy Policy, please contact us in our feedback forms in any of the apps (iOS, Android, and Web)

1. INTRODUCTION

We currently operate the JStore app (the "app") as well as the website www.jstore.xyz (the "website" and, together with the app, the "services"). This Privacy Policy covers the use of the Services. We built the JStore web-based app, iOS (coming soon), and Android. This SERVICE is provided by JStore at no cost and is intended for use as is. This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.

2. PERSONAL RIGHTS

2.1 Agreement and Personal Information
If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy. The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at JStore unless otherwise defined in this Privacy Policy.

2.2 Information and registration
We and our service providers may use the Services to collect personal information about you in the manner set out in this Privacy Policy. After the process of signing up, we require information from you. This information may include your name, e-mail address, and phone numbers.

2.3 Ads and picture usage
JStore has the full rights to use any ad you post to JStore, including the uploaded photo or image of the product, and other data (including username and location) associated with the ad for our own promotional purposes, including social media, Facebook ads, newsletters and ads for other media.

2.4 Usage for corporate requirements
JStore may aggregate personally identifiable information that, once aggregated, will not identify you or any other user of the Services. For example, we aggregate personal information to calculate the percentage of our users with a specific postal code. We may use your personal information to produce statistics or any other important overall conclusion for the growth and development of our company.

2.5 Sharing of personal data
We may share the personal information we collect about you with our partners for the purposes set out in this Privacy Policy; to our service providers who provide services such as web site hosting, data analysis, payment processing, order fulfillment, IT services and provision of appropriate infrastructure, customer service, email delivery, verification and other services; to a third party provider in the event of a restructuring, merger, sale, joint venture, transfer or otherwise full or partial disposition of any of our Company's shares, assets or shares. JStore deems the right to use or disclose personal information collected about you if we find it necessary or appropriate, including but not limited to the use and disclosure of personal information for the purposes of: protecting people or property, protecting our services, rights and our property, to comply with legal requirements, and to comply with requests by courts or other governmental authorities.

2.6 Public data
As a JStore user, please note and understand that all data published by you in the Services is publicly available and may be available to other users and the public. We strongly advise you to decide wisely what data you publish about the services. In addition, please note that your username, email, and phone number will be made available to the public when you use certain services, such as item posting, so you should use these services wisely. Personal information that you publish or share with other users may be collected by other users of such services and may result in unsolicited messages. We assume no responsibility for the protection of such data, which you pass on to third parties through our services.

2.7 Information Collection and Use 
For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Full Name, Email Address, Device Token, Phone Number. The information that we request will be retained by us and used as described in this privacy policy.

2.8 Log Data
We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.

3. JStore ROLES AND DATA PROTECTION COMMITMENT
3.1 E-mail, promotions, and push notifications
JStore may contact you and / or send you commercial communications via electronic communications media such as email to inform you of our products, services, offers and other commercial content related to our company. You are bound to receive these promotions and other important information, derived from our operations. We may also send you push notifications, if you have chosen to receive them. You can disable push notifications in your mobile device settings. 

3.2 JStore responsibility and commitment 
JStore is committed to protect personal information and data within our database. We take reasonable organizational, technical and administrative measures to protect personal information within our company. However, no website or Internet transmission is completely secure. Therefore, we can not guarantee that unauthorized access, hacker attacks, data loss or other violations are excluded. Your use of the App and the Services is at your own risk. We strongly advise you to take steps to protect your personal information by memorizing your password or keeping it in a safe place. You can use our app and use our website without providing personal information. However, in order to provide certain services, we need to collect personal information. If you refuse to provide your personal information when it is needed, we may not be able to provide you with certain services (such as marking your account as "verified"). Likewise, it may not be possible for you to acquire certain functions of JStore in connection with the Services. If you consent to the collection of your personal information, we may use it to provide you with services in connection with such purchase. If you provide us or our service providers with personal information about others in connection with the Services,

4. EXTERNAL USAGE

4.1 Third Party Services
The app does use third party services that may collect information used to identify you. Link to privacy policy of third party service providers used by the app Google Play Services. We may use a third party payment service provider (in development) to process payments made through the Services. If you wish to process your payment through the Services, your personal information may be collected by such third party providers and not by us, and they are subject to this third party privacy policy and not this Privacy Policy. We have no control and are not responsible for the collection, use and disclosure of your personal information by this third party.

4.2 Links to Other Sites
This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.

4.3 Cookies
Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your device internal memory. This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collection information and to improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service. 

4.4 Service Providers 
We may employ third-party companies and individuals due to the following reasons: 
● To facilitate our Service; 
● To provide the Service on our behalf; 
● To perform Service-related services; 
or ● To assist us in analyzing how our Service is used. 
We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.

5. OTHER MATTERS

5.1 Security
We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.

5.2 Retention Period We retain your personal information for as long as necessary to fulfill the purposes set forth in this Privacy Policy, unless a longer retention period is required or permitted by law. JStore guarantees that the personal data will be safe throughout this period.

5.3 Children’s Privacy 
These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.

5.4 Changes to This Privacy Policy We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
`
)
}

export const impressum = () => {
return (
`
Angaben gemäß § 5 TMG
JStore
Campus Ring 1, Jacobs University Bremen gGmbH, Mailbox 217, 243 28759 Bremen
Vertreten durch:
Tianyao Chen
Taiyr Begeyev
Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
Tianyao Chen
Taiyr Begeyev
Campus Ring 1, Jacobs University Bremen gGmbH 28759 Bremen
Haftungsausschluss: Haftung für Inhalte
Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
Haftung für Links
Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
Urheberrecht
Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
Datenschutz
Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
Google Analytics
Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. (''Google''). Google Analytics verwendet sog. ''Cookies'', Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglicht. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer IP-Adresse) wird an einen Server von Google in den USA übertragen und dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten für die Websitebetreiber zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten der Google in Verbindung bringen. Sie können die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.
Google AdSense
Diese Website benutzt Google Adsense, einen Webanzeigendienst der Google Inc., USA (''Google''). Google Adsense verwendet sog. ''Cookies'' (Textdateien), die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglicht. Google Adsense verwendet auch sog. ''Web Beacons'' (kleine unsichtbare Grafiken) zur Sammlung von Informationen. Durch die Verwendung des Web Beacons können einfache Aktionen wie der Besucherverkehr auf der Webseite aufgezeichnet und gesammelt werden. Die durch den Cookie und/oder Web Beacon erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer IP-Adresse) werden an einen Server von Google in den USA übertragen und dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Website im Hinblick auf die Anzeigen auszuwerten, um Reports über die Websiteaktivitäten und Anzeigen für die Websitebetreiber zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten der Google in Verbindung bringen. Das Speichern von Cookies auf Ihrer Festplatte und die Anzeige von Web Beacons können Sie verhindern, indem Sie in Ihren Browser-Einstellungen ''keine Cookies akzeptieren'' wählen (Im MS Internet-Explorer unter ''Extras > Internetoptionen > Datenschutz > Einstellung''; im Firefox unter ''Extras > Einstellungen > Datenschutz > Cookies''); wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über
Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.
`
)
}
