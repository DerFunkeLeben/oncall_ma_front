import { combineReducers } from 'redux'
import { v4 as uuid } from 'uuid'

import { ContentAction } from 'constants/content'
import { foldersReducer } from 'store/folders/reducers'
import { IStoreFolder } from 'store/folders/_data-types'

import ActionType from './action-type'
import { IStoreContent, StoreKeys } from './_data-types'
import { MainReducerKeys } from 'store/data-types'

import { IReducer } from '../data-types'
import { ContentTypes } from 'types/content'

const initialContentState: IStoreContent = {
  allContent: {
    '9144': {
      id: '9144',
      title: 'Новогодняя рассылка',
      type: ContentTypes.HTML,
      createDate: new Date('08.22.2022'),
      lastUpdateDate: new Date('11.30.2022'),
      folderId: '52',
      theme: 'Тема',
      preheader: 'Прехедер111',
      HTML: `
      <!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <custom name="opencounter" type="tracking">
      </custom></head><body style="background:#eaeaea"><table style="margin: 0 auto; width:100%"> <tr><td><center style="width: 100%"><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;background:#ffffff"><tbody><tr style="margin: 0 auto;" align="center"><td width="600"><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td><img src="https://i.ibb.co/2ttG4Ys/header_img.png" style="display: block"></td></tr><tr> <td height="20"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"></td><td style="color: #EA7820; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 18px;" width="480">%%FIRST_NAME%% %%MIDDLE_NAME%%,  добрый день! </td><td width="60"></td></tr><tr> <td height="16"></td></tr><tr> <td width="60"></td><td style="color: #044267; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;" width="480">Приглашаем Вас присоединиться к онлайн трансляции <br>
      семинара для врачей-педиатров</td><td width="60"></td></tr><tr> <td height="15"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"></td><td width="200" style="color: #044267; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 20px;">02 июня 2021 года с <br>
      10.00 до 11.30 (МСК)</td><td width="100"></td><td width="180"><a href="https://oniicom.ru/registration-ped-02-06-2021/" target="_blank"><img src="https://i.ibb.co/26W8Gwf/connect.png"></a></td><td width="60"></td></tr><tr> <td height="15"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"></td><td style="color: #EA7820; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; font-weight:700">10.00 – 10.30</td><td width="60"></td></tr><tr> <td height="10"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"></td><td style="color: #044267; font-family: Arial, sans-serif; font-size: 20px; font-weight: bold; line-height: 24px;">«Роль микробиома ЖКТ и респираторного тракта при COVID-19»</td><td width="60"></td></tr><tr> <td height="15"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"> </td><td style="color: #0D3E67; font-family: Trebuchet MS, sans-serif; font-size: 15px; font-weight: bold; line-height: 24px;" width="260">В рамках лекции мы рассмотрим: <br><p style="color: #0D3E67; font-family: Trebuchet MS, sans-serif; font-size: 13px; line-height: 15px;"><img src="https://i.ibb.co/sVYSW6K/ellipse.png">&nbsp; Диарея как симптом при COVID-19 <br><br><img src="https://i.ibb.co/sVYSW6K/ellipse.png">&nbsp; Состояние микробиома ЖКТ после <br>
      перенесенной Коронавирусной <br>
      инфекции – каковы последствия? <br><br><img src="https://i.ibb.co/sVYSW6K/ellipse.png">&nbsp; Роль пробиотика в схеме терапии <br>
      диареи при COVID-19 - мала или <br>
      велика? <br></p></td><td><img src="https://i.ibb.co/5MRFMVW/bacteria.png" width="260"></td><td width="20"></td></tr></table><table width="480" border="0" cellpadding="0" border-collapse="collapse" cellspacing="0"><tr><td><img src="https://i.ibb.co/dr3v5H0/photo-1.png" width="137" alt="Усенко Д.В"></td><td width="25"></td><td style="font-family: Arial, sans-serif; font-size: 12px; font-weight: bold; color: #EA7820; line-height: 20px">Спикер<br><span style="font-family: Arial, sans-serif; font-size: 16px; color: #044267; font-weight: bold;">Усенко Денис Валерьевич</span><br><br><span style="font-family: Arial, sans-serif; font-size: 14px; color: #044267; font-weight: normal;">Д.м.н., ведущий научный сотрудник клинического отдела инфекционной патологии Центрального НИИ эпидемиологии Роспотребнадзора</span></td></tr><tr> <td height="33"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="600" align="right"><img src="https://i.ibb.co/qMQ7G71/pack.png" width="575" style="display: block"></td></tr><tr> <td height="25"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"> </td><td width="480" align="left" style="font-family: Arial, sans-serif; font-size: 10px; color: #044267; font-weight: normal;"><span style="font-weight: bold;">Источники:</span><br><br>*В зависимости от показания, возраста, тяжести симптомов.<br>1. Манкевич Р.Н. и соавт. Особенности терапии ротавирусной инфекции у детей на современном этапе. «Педиатрия. Восточная Европа» 2016, том 4, No 2 с.8-1.<br>2. Ушкалова Е.А. Гущина Ю.Ш. Линекс Форте в профилактике и лечении желудочно-кишечных заболеваний. Тер. архив 2015, No12, с. 138-144.<br>3. Инструкция по медицинскому применению Линекс® Форте.</td><td width="60"> </td></tr><tr> <td height="45"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"></td><td style="color: #EA7820; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; font-weight:700">10.30 – 11.00</td><td width="60"></td></tr><tr> <td height="10"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"></td><td style="color: #044267; font-family: Arial, sans-serif; font-size: 20px; font-weight: bold; line-height: 24px;">«Взгляд клинического фармаколога на топические формы антибактериальных препаратов в лечении инфекций кожи у детей»</td><td width="60"></td></tr><tr> <td height="15"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"> </td><td style="color: #0D3E67; font-family: Trebuchet MS, sans-serif; font-size: 15px; font-weight: bold; line-height: 24px;" width="288">В рамках лекции мы рассмотрим: <br><p style="color: #0D3E67; font-family: Trebuchet MS, sans-serif; font-size: 13px; line-height: 15px;"><img src="https://i.ibb.co/sVYSW6K/ellipse.png">&nbsp; Современный взгляд на топические<br>
      формы – какие преимущества? <br><br><img src="https://i.ibb.co/sVYSW6K/ellipse.png">&nbsp; Взгляд фармаколога на проблему  <br>
      резистентности топических форм <br><br><img src="https://i.ibb.co/sVYSW6K/ellipse.png">&nbsp; Терапия ИВЗК у детей – важные  <br>
      аспекты для практикующего врача <br></p></td><td><img src="https://i.ibb.co/7pM0vQh/bacteria-2.png" width="197"></td><td width="55"></td></tr></table><table width="480" border="0" cellpadding="0" border-collapse="collapse" cellspacing="0"><tr><td><img src="https://i.ibb.co/jGpTFXf/photo-2.png" width="137" alt="Усенко Д.В"></td><td width="25"></td><td style="font-family: Arial, sans-serif; font-size: 12px; font-weight: bold; color: #EA7820; line-height: 20px">Спикер<br><span style="font-family: Arial, sans-serif; font-size: 16px; color: #044267; font-weight: bold;">Дронов Иван Анатольевич</span><br><br><span style="font-family: Arial, sans-serif; font-size: 14px; color: #044267; font-weight: normal;">к.м.н., педиатр, клинический фармаколог
      член Московского общества детских врачей «Педиатрическое респираторное общество»
      ФГАОУ ВО Первый МГМУ им. И. М. Сеченова Минздрава России, Москва, Россия</span></td></tr><tr> <td height="45"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0; background-color:#F7F7F7"><tr> <td width="60"> </td><td width="372"><table border="0" cellpadding="0" width="372" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td style="color: #525252; font-family: Trebuchet MS, sans-serif; font-size: 16px; line-height: 19px;" align="left"> <span style="font-weight: bold;">Банеоцин</span><sup style="line-height: 0"><small>®</small></sup> — рациональная комбинация 2-х<br>антибиотиков для лечения бактериальных <br>инфекций в дерматологической практике<sup style="line-height: 0"><small>4,5</small></sup><br><br><br>Основные возбудители бактериальных <br>инфекций кожи сохраняют высокую <br>чувствительность к компонентам Банеоцин<sup style="line-height: 0"><small>®4,5</small></sup></td></tr><tr> <td height="60"> </td></tr><tr> <td style="color: #525252; font-family: Trebuchet MS, sans-serif; font-size: 16px; line-height: 19px; font-weight: bold;" align="left"> Низкий уровень резистентности <br>основных возбудителей пиодермий к <br>Банеоцин обсусловлен:<sup style="line-height: 0"><small>5, 6, 7, 8</small></sup></td></tr><tr> <td height="30"> </td></tr><tr> <td align="left"><table border="0" cellpadding="0" width="372" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="40" style="padding: 0 0 50px 0"> <img src="https://i.ibb.co/7YZgZ11/icon-1.png" width="40"></td><td width="20"> </td><td width="312" style="color: #525252; font-family: Trebuchet MS, sans-serif; font-size: 16px; line-height: 20px;" align="left"> Комбинацией 2-х бактерицидных<br>
      антибиотиков с доказанным <br>
      синергизмом действия в отношении <br>
      S.aureus  <br><br></td></tr><tr> <td width="40"> <img src="https://i.ibb.co/8sHLVQ7/icon-2.png" width="40"></td><td width="20"> </td><td width="312" style="color: #525252; font-family: Trebuchet MS, sans-serif; font-size: 16px; line-height: 20px;" align="left"> Отсутствием системной формы<br> 
      бацитрацина</td></tr></table></td></tr></table></td><td width="168"><img src="https://i.ibb.co/zJJmv2L/packs.png" width="168"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td height="37"> </td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"> </td><td width="480" align="left" style="font-family: Arial, sans-serif; font-size: 10px; color: #044267; font-weight: normal;"><span style="font-weight: bold;">Источники:</span><br><br>4. Ю.А. Белькова и др. КМАХ 2013;15(2): 131-42 В открытое проспективное рандомизированное исследование было включено 309 взрослых пациентов с хирургическими ИКМТ легкой и средней степени тяжести, получавших местную терапию комбинированным препаратом бацитрацина с неомицином в форме порошка и/или мази (n=156) или 0,75% мазью хлорамфеникола (n=153). Режимы терапии показали сопоставимую общую клиническую эффективность при хирургических
      ИКМТ (97,4% для обоих препаратов, р=0,98), однако использование комбинации бацитрацина с неомицином сопровождалось разрешением клинической симптоматики инфекционного процесса в достоверно более ранние сроки (доля излеченных пациентв к 8 дню терапии – 82,7% vs. 68,6% (р=0,004), 15 дню – 97,4% vs. 94,8%, р=0,23 соответстенно)<br>5. Инструкции по медицинскому применению лекарственных препаратов Банеоцин® порошок и Банеоцин® мазь <br>6. Кунгуров Н.В. и др. Клиническая эффективность и алгоритмы применения препарата Банеоцин® в терапии больных дерматозами. Клин дерматология и венерология 2005; 4: 69-76<br>7. Ю.А. Белькова и др. Эффективность и безопасность местного использования комбинации бацитрацина и неомицина в сравнении с хлорамфениколом в терапии неосложненных хирургических ИКМТ у взрослых амбулаторных пациентов. КМАХ 2013;15(2): 131-42<br>8. Информация доступна по ссылке: https://grls.rosminzdrav.ru/ на 24.03.2020</td><td width="60"> </td></tr><tr> <td height="45"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"></td><td style="color: #EA7820; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; font-weight:700">11.00 – 11.30</td><td width="60"></td></tr><tr> <td height="10"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"></td><td style="color: #044267; font-family: Arial, sans-serif; font-size: 20px; font-weight: bold; line-height: 24px;">«Витамины, минералы и пробиотики. Синергизм действия для получения качественно нового иммуноукрепляющего ответа»</td><td width="50"></td></tr><tr> <td height="15"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"> </td><td width="302" style="color: #0D3E67; font-family: Trebuchet MS, sans-serif; font-size: 15px; font-weight: bold; line-height: 24px;">В рамках лекции мы рассмотрим: <br><p style="color: #0D3E67; font-family: Trebuchet MS, sans-serif; font-size: 13px; line-height: 15px;"><img src="https://i.ibb.co/sVYSW6K/ellipse.png">&nbsp; Проявление симптомов атопии у<br>
      ребенка – так ли все однозначно? <br><br><img src="https://i.ibb.co/sVYSW6K/ellipse.png">&nbsp; Как недостаток витаминов влияет на   <br>
      детский организм и каковы <br>
      последствия? <br><br><img src="https://i.ibb.co/sVYSW6K/ellipse.png">&nbsp; Иммунопробиотик – новый помощник   <br>
      для поддержания здорового организма <br>
      у детей. <br></p></td><td width="183"><img src="https://i.ibb.co/VCySycJ/bacteria-3.png" width="183"></td><td width="55"></td></tr></table><table width="480" border="0" cellpadding="0" border-collapse="collapse" cellspacing="0"><tr><td><img src="https://i.ibb.co/6N6cK3y/photo-3.png" width="137" alt="Усенко Д.В"></td><td width="25"></td><td style="font-family: Arial, sans-serif; font-size: 12px; font-weight: bold; color: #EA7820; line-height: 20px">Спикер<br><span style="font-family: Arial, sans-serif; font-size: 16px; color: #044267; font-weight: bold;">Ковригина Елена Семеновна</span><br><br><span style="font-family: Arial, sans-serif; font-size: 14px; color: #044267; font-weight: normal;">к.м.н. Кафедра педиатрии и школьной <br>медицины Факультета дополнительного <br>профессионального образования РНИМУ <br>им. Н.И. Пирогова.</span></td></tr><tr> <td height="70"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td><img src="https://i.ibb.co/gvYNfMy/pack-comp.png" width="600" style="display: block"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0;"><tr> <td width="60"> </td><td width="480" align="left" style="font-family: Arial, sans-serif; font-size: 10px; color: #044267; font-weight: normal;"><span style="font-weight: bold;">Источники:</span><br><br>9. 70-80% иммуннокомпетентных клеток всего организма находится в кишечнике, Vighi G et al. Allergy and the gastrointestinal system. Clin Exp Immunol. 2008;153 (Suppl 1):3–6 // Булатова Е. М. и соавт. Кишечная микробиота: современные представления. Педиатрия, 2009, т. 87, №3, с.104-110 и др.<br>10. Листок-вкладыш КОМПЛИНЕКС<br>11. Segers M. E., Lebeer S. Towards a better understanding of Lactobacillus rhamnosus GG-host interactions. Microbial cell factories. BioMed Central 2014; 13(1): 1–16<br>12. Probiotics and prebiotics. WGO Global Guidelines. February 2017</td><td width="60"> </td></tr><tr> <td height="20"></td></tr></table><table width="600" border="0" cellpadding="0" border-collapse="collapse" cellspacing="0" style="background-color: #EEEEEF"><tr> <td height="32" style="background-color: #EEEEEF"></td></tr></table><table width="600" border="0" cellpadding="0" border-collapse="collapse" cellspacing="0" style="background-color: #EEEEEF"><tr><td width="60" style="background-color: #EEEEEF"></td><td width="300" style="font-family: Arial, sans-serif; font-size: 12px; color: #044267; line-height: 14px; background-color: #EEEEEF" align="left">Надеемся, данные материалы<br>будут полезны для Вас</td><td width="240" align="left" style="background-color: #EEEEEF"><a href="https://oniicom.ru/registration-ped-02-06-2021/" target="_blank"><img src="https://i.ibb.co/26W8Gwf/connect.png" width="182" style="display: block"></a></td></tr></table><table width="600" border="0" cellpadding="0" border-collapse="collapse" cellspacing="0" style="background-color: #EEEEEF"><tr> <td height="32" style="background-color: #EEEEEF"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0; background-color: #F08F00"><tr> <td height="30"></td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0; background-color: #F08F00"><tr> <td width="60"> </td><td width="480" align="left" style="font-family: Arial, sans-serif; font-size: 12px; color:#FFFFFF; font-weight: normal; line-height:14px"><span style="font-size: 14px;">С наилучшими пожеланиями,<br>Бизнес-подразделение безрецептурных препаратов «Сандоз»</span><br><br>Безопасность пациента является наивысшим приоритетом для «Сандоз».
      Если у Вашего пациента развилось нежелательное явление на фоне приема препарата, Вы можете сообщить о нём по телефону +7 (495) 967 12 70 или отправить сообщение на электронный адрес: <a href="mailto:drug.safety_russia@novartis.com" style="color: #ffffff; text-decoration: none;">drug.safety_russia@novartis.com</a><br><br>Материал является научно-образовательным и направлен на повышение профессионального уровня специалистов здравоохранения.<br><br>Сообщение предназначено только для медицинских и фармацевтических работников. Вы получили это письмо, так как подписали согласие на получение информации от компании «Сандоз». В случае, если Вы не хотите получать рассылки
      от «Сандоз», Вы можете <a href="%%unsub_center_url%%" target="_blank" style="text-decoration: underline; color: #ffffff;">отписаться.</a><br><br>Инструкция по препарату доступна по ссылке: <a href="https://www.linex.ru/" target="_blank" style="text-decoration: none; font-family: Arial, sans-serif; font-size: 12px; color: #ffffff;">www.linex.ru</a></td><td width="60"> </td></tr></table><table border="0" cellpadding="0" width="600" border-collapse="collapse" cellspacing="0" style="margin:0 auto; padding:0; background-color: #F08F00"><tr> <td height="25"></td></tr></table><table width="480"><tr><td height="30"></td></tr><tr><td width="220"><b style="font-family: Arial, sans-serif; font-size: 12px; color: #044267;">АО «Сандоз»</b></td></tr><tr><td height="20"></td></tr><tr style="vertical-align: top;"><td><b style="font-family: Arial, sans-serif; font-size: 12px; color: #044267;">Адрес:</b><br><span style="font-family: Arial, sans-serif; font-size: 12px; color: #044267;">125315, г. Москва,<br>Ленинградский проспект, д. 70<br><br><a href="https://www.sandoz.ru/" target="_blank" style="text-decoration: none; font-family: Arial, sans-serif; font-size: 12px; color: #044267;">www.sandoz.ru</a><br><br><span style="font-family: Arial, sans-serif; font-size: 12px; color: #044267;">RU2105282474</span></span></td><td><b style="font-family: Arial, sans-serif; font-size: 12px; color: #044267;">Тел.:</b><br><a href="tel:+74956607509" style="color: #044267; text-decoration: none; font-family: Arial, sans-serif; font-size: 12px; color: #044267;">+7 495 660 75 09</a></td><td><b style="font-family: Arial, sans-serif; font-size: 12px; color: #044267;">Факс:</b><br><span style="font-family: Arial, sans-serif; font-size: 12px; color: #044267;">+7 495 660 75 10</span></td></tr></table><table width="480"><tr><td align="right"><img width="140" src="https://i.ibb.co/gMJ4HDJ/sandoz-logo.png" alt="sandoz logo"></td></tr></table><table width="480"><tr style="background: #fff"><td height="50"></td></tr></table></td></tr></tbody></table></center></td></tr></table><div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">This email was sent by: %%Member_Busname%% %%Member_Addr%% %%Member_City%%, %%Member_State%%, %%Member_PostalCode%%, %%Member_Country%%</div><div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"><a href="%%profile_center_url%%" alias="Update Profile">Update Profile</a></div></body></html>
      `,
    },
    '9145': {
      id: '9145',
      title: 'Терапевты_март',
      type: ContentTypes.IMAGE,
      folderId: '52',
      createDate: new Date('02.02.1945'),
      lastUpdateDate: new Date('02.01.1946'),
      filePath: 'aaa',
    },
    '9146': {
      id: '9146',
      title: 'Онбординг_медпоинт',
      type: ContentTypes.PDF,
      folderId: '43',
      createDate: '12.02.1985',
      lastUpdateDate: new Date('02.01.1986'),
      filePath: 'aasssa',
    },
    '9147': {
      id: '9147',
      title: 'Digest_march',
      type: ContentTypes.FILE,
      createDate: '21.12.2013',
      lastUpdateDate: new Date('04.05.2016'),
      filePath: 'aasssa',
      folderId: '34',
    },
    '2144': {
      id: '2144',
      title: 'Новогодняя рассылка sms',
      type: ContentTypes.SMS,
      createDate: new Date('02.02.1985'),
      lastUpdateDate: new Date('02.01.1986'),
      text: 'Sms text qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
      folderId: '34',
    },
  },

  currentContent: {
    content: undefined,
    contentAction: ContentAction.CREATE,
  },
}

const initialFolderState: IStoreFolder = {
  activeFolderId: '0_content',
  mainFolderId: '0_content',
  allFolders: {
    '0_content': {
      name: 'Весь контент',
      id: '0_content',
      count: 147,
      isMainFolder: true,
    },
    '52': {
      name: 'Тестовые рассылки',
      id: '52',
      count: 50,
    },
    '43': {
      name: 'Завершенные рассылки',
      id: '43',
      count: 999954,
    },
    '48': {
      name: 'Рассылки январь февраль',
      id: '48',
      count: 1786,
    },
    '34': {
      name: 'Medpoint',
      id: '34',
      count: 2,
    },
  },
}

const contentReducer = (
  state = initialContentState,
  { type, payload }: IReducer
): IStoreContent => {
  switch (type) {
    case ActionType.SET_CURRENT_CONTENT:
      return {
        ...state,
        [StoreKeys.currentContent]: payload,
      }

    case ActionType.CREATE_CONTENT: {
      const id = uuid()
      const today = new Date()
      const newContent = {
        ...payload,
        id,
        createDate: today,
        lastUpdateDate: today,
      }
      return {
        ...state,
        [StoreKeys.currentContent]: initialContentState.currentContent,
        [StoreKeys.allContent]: { ...state.allContent, [id]: newContent },
      }
    }

    case ActionType.SAVE_CONTENT: {
      const today = new Date()
      const newContent = {
        ...payload,
        lastUpdateDate: today,
      }
      return {
        ...state,
        [StoreKeys.currentContent]: initialContentState.currentContent,
        [StoreKeys.allContent]: { ...state.allContent, [payload.id]: newContent },
      }
    }

    case ActionType.DELETE_CONTENT: {
      const { [payload.id]: _, ...otherContent } = state.allContent
      return {
        ...state,
        [StoreKeys.currentContent]: initialContentState.currentContent,
        [StoreKeys.allContent]: otherContent,
      }
    }

    case ActionType.DELETE_MULTIPLE: {
      const allContentKeys = Object.keys(state.allContent)

      const filteredContent = allContentKeys.reduce((acc, key) => {
        const content = state.allContent[key]
        if (payload.includes(key)) return acc
        return { ...acc, [key]: content }
      }, {})

      return {
        ...state,
        [StoreKeys.allContent]: filteredContent,
      }
    }

    default:
      return state
  }
}

const reducer = combineReducers({
  data: contentReducer,
  folders: foldersReducer(MainReducerKeys.content),
})

export { reducer, initialContentState, initialFolderState }
