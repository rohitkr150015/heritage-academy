from pathlib import Path
import urllib.request,re
out=Path(__file__).resolve().parent.parent/'public/fonts';out.mkdir(exist_ok=True)
ua='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
for family,name in [('Source+Serif+4:wght@400..700','source-serif-4'),('Inter:wght@100..900','inter'),('Noto+Sans+Devanagari:wght@400..700','noto-devanagari')]:
 req=urllib.request.Request('https://fonts.googleapis.com/css2?family='+family+'&display=swap',headers={'User-Agent':ua})
 css=urllib.request.urlopen(req,timeout=30).read().decode()
 blocks=css.split('/*');block=next((b for b in blocks if b.startswith('devanagari' if name=='noto-devanagari' else 'latin */')),blocks[-1])
 url=re.findall(r'url\((https[^)]+)\)',block)[0]
 data=urllib.request.urlopen(url,timeout=30).read();(out/(name+'.woff2')).write_bytes(data);print(name,len(data),'bytes')
for family,name in [('sourceserif4','source-serif-4'),('inter','inter'),('notosansdevanagari','noto-devanagari')]:
 try:
  raw=urllib.request.urlopen('https://raw.githubusercontent.com/google/fonts/main/ofl/'+family+'/OFL.txt',timeout=20).read();(out/(name+'-OFL.txt')).write_bytes(raw)
 except Exception as exc: print('License fetch:',family,str(exc))
