"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Beaker,
  Flame,
  Droplets,
  ChevronRight,
  Compass,
  Sparkles,
  Zap,
} from "lucide-react";

export interface ScrollyStep {
  id: string;
  topic: "titrasi" | "penyangga" | "uji-nyala";
  stepNumber: number;
  apparatusId: string;
  apparatusName: string;
  fbxFile: string;
  stageTitle: string;
  concept: string;
  formula?: string;
  role: string;
  applications: string[];
  sop: string[];
  warning: string;
}

export const SCROLLY_STEPS: ScrollyStep[] = [
  // ===================== TITRASI =====================
  {
    id: "titrasi-1",
    topic: "titrasi",
    stepNumber: 1,
    apparatusId: "neraca-analitik",
    apparatusName: "Neraca Analitik Digital",
    fbxFile: "/Neraca analitik.fbx",
    stageTitle: "1. Penimbangan Baku Primer",
    concept: "Menentukan massa standar primer (Asam Oksalat) hingga 4 desimal (±0.0001 g) untuk standarisasi NaOH.",
    formula: "H₂C₂O₄·2H₂O (s) + 2NaOH (aq) → Na₂C₂O₄ + 4H₂O",
    role: "Menimbang ~0.6300 g asam oksalat murni di atas kaca arloji.",
    applications: [
      "Penetapan kadar kemurnian obat (QC Farmasi)",
      "Analisis gravimetri pengendapan presisi",
      "Pembuatan deret standar kalibrasi UV-Vis",
    ],
    sop: [
      "Periksa gelembung waterpass tepat di tengah.",
      "Tekan 'Tare' dengan kaca arloji di dalam piringan.",
      "Tutup rapat pintu kaca sebelum mencatat angka massa.",
    ],
    warning: "DILARANG menimbang zat kimia panas atau tanpa wadah!",
  },
  {
    id: "titrasi-2",
    topic: "titrasi",
    stepNumber: 2,
    apparatusId: "pipet-volume",
    apparatusName: "Pipet Volume & Propipet",
    fbxFile: "/Pipet volume.fbx",
    stageTitle: "2. Pengambilan Alikuot Analit",
    concept: "Memindahkan tepat 25.00 mL larutan analit dengan toleransi sangat ketat (Kelas AS: ±0.015 mL).",
    formula: "V₁ × M₁ × n₁ = V₂ × M₂ × n₂",
    role: "Mengambil sampel asam ke dalam erlenmeyer bebas galat paralaks.",
    applications: [
      "Pengenceran bertingkat larutan standar",
      "Analisis alikuot darah & cairan biologi",
      "Sampling baku uji lingkungan (COD / BOD)",
    ],
    sop: [
      "Gunakan propipet: katup A (kempiskan), katup S (hisap), katup E (keluarkan).",
      "Tepatkan dasar miniskus sejajar garis kalibrasi.",
      "Alirkan menempel pada dinding erlenmeyer (jangan ditiup).",
    ],
    warning: "DILARANG memipet asam/basa menggunakan mulut!",
  },
  {
    id: "titrasi-3",
    topic: "titrasi",
    stepNumber: 3,
    apparatusId: "buret",
    apparatusName: "Buret 50 mL & Statif Klem",
    fbxFile: "/Buret3.fbx",
    stageTitle: "3. Pengisian Titran & Hilangkan Gelembung",
    concept: "Mengalirkan titran tetes demi tetes secara presisi melalui kran stopcock PTFE terkalibrasi.",
    formula: "HCl (analit di labu) + NaOH (titran di buret) → NaCl + H₂O",
    role: "Menampung titran dengan ketelitian bacaan hingga ±0.02 mL.",
    applications: [
      "Titrasi redoks permanganometri & iodometri",
      "Uji kesadahan air EDTA (kompleksometri)",
      "Uji bilangan asam minyak goreng & biodiesel",
    ],
    sop: [
      "Bilas buret dengan sedikit titran sebelum diisi.",
      "Buka kran cepat untuk membuang gelembung udara di ujung cerat.",
      "Atur kran dengan tangan kiri, tangan kanan menggoyang labu.",
    ],
    warning: "Gelembung di cerat buret memicu kesalahan hingga 0.20 mL!",
  },
  {
    id: "titrasi-4",
    topic: "titrasi",
    stepNumber: 4,
    apparatusId: "alat-penetes",
    apparatusName: "Pipet Tetes (Indikator PP)",
    fbxFile: "/Alat Penetes.fbx",
    stageTitle: "4. Titik Akhir Indikator Fenolftalein",
    concept: "Memberi sinyal visual saat larutan berubah dari tak berwarna menjadi merah muda seulas (pH 8.2–10.0).",
    formula: "HIn (tak berwarna, pH < 8.2) + OH⁻ ⇌ In⁻ (merah muda, pH > 8.2)",
    role: "Menambahkan 2–3 tetes indikator warna ke dalam erlenmeyer.",
    applications: [
      "Penambahan indikator uji asam-basa",
      "Pengaturan pH mikro tetes demi tetes",
      "Uji bercak reaksi spot-plate kualitatif",
    ],
    sop: [
      "Pegang pipet tegak lurus di atas mulut erlenmeyer.",
      "Tambahkan cukup 2–3 tetes (hindari berlebih).",
      "Hentikan titrasi saat warna merah muda bertahan 30 detik.",
    ],
    warning: "Jangan membalik pipet agar cairan tidak merusak karet!",
  },

  // ===================== LARUTAN PENYANGGA =====================
  {
    id: "penyangga-1",
    topic: "penyangga",
    stepNumber: 1,
    apparatusId: "botol-chemical",
    apparatusName: "Botol Reagen Amber",
    fbxFile: "/Botol Chemical.fbx",
    stageTitle: "1. Penyimpanan Komponen Buffer",
    concept: "Melindungi stok asam asetat dan reagen buffer dari penguraian cahaya UV dan kontaminasi udara.",
    formula: "CH₃COOH (aq) ⇌ CH₃COO⁻ (aq) + H⁺ (aq)",
    role: "Menjaga stabilitas reagen penyangga asam pekat fotoprotektif.",
    applications: [
      "Penyimpanan media biologi & buffer fosfat (PBS)",
      "Stok elektrolit kalibrasi elektroda pH-meter",
      "Penyimpanan reagen pengkelat peka cahaya",
    ],
    sop: [
      "Letakkan tutup kaca asah terbalik di atas meja bersih.",
      "Pegang botol dengan telapak tangan menutupi label.",
      "Tutup segera setelah mengambil larutan.",
    ],
    warning: "Jangan menukar tutup botol agar tidak terjadi kontaminasi!",
  },
  {
    id: "penyangga-2",
    topic: "penyangga",
    stepNumber: 2,
    apparatusId: "kaca-arloji",
    apparatusName: "Kaca Arloji & Spatula",
    fbxFile: "/Kaca Arloji.fbx",
    stageTitle: "2. Penimbangan Garam Konjugasi",
    concept: "pH buffer diatur oleh rasio mol asam lemah terhadap basa konjugasinya (Henderson-Hasselbalch).",
    formula: "pH = pKa + log([CH₃COO⁻] / [CH₃COOH])",
    role: "Wadah penimbang serbuk garam kristal natrium asetat (CH₃COONa).",
    applications: [
      "Wadah penguapan pelarut membentuk kristal",
      "Penutup gelas piala pencegah letupan uap",
      "Uji titik lebur padatan kimia organik",
    ],
    sop: [
      "Pastikan kaca arloji kering sebelum diletakkan di neraca.",
      "Gunakan ujung spatula untuk mencuil butiran garam.",
      "Larutkan garam dengan sedikit aquades sebelum dicampur.",
    ],
    warning: "Jangan memanaskan kaca arloji langsung di atas api terbuka!",
  },
  {
    id: "penyangga-3",
    topic: "penyangga",
    stepNumber: 3,
    apparatusId: "wadah-bulat",
    apparatusName: "Labu Alas Bulat Pencampur",
    fbxFile: "/Wadah bulat full.fbx",
    stageTitle: "3. Homogenisasi Larutan Buffer",
    concept: "Geometri sferis labu alas bulat memungkinkan pengocokan memutar tanpa cipratan dan bebas sudut mati.",
    formula: "+ H⁺: CH₃COO⁻ + H⁺ → CH₃COOH | + OH⁻: CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O",
    role: "Wadah pelarutan dan pencampuran homogen sistem buffer.",
    applications: [
      "Sintesis senyawa ester dan polimer organik",
      "Distilasi pemurnian pelarut vakum",
      "Reaksi pemanasan refluks berkondensor",
    ],
    sop: [
      "Goyang labu memutar hingga kristal garam larut sempurna.",
      "Gunakan penangas air (waterbath) bila perlu pemanasan.",
      "Klem bagian leher labu pada tiang statif secara stabil.",
    ],
    warning: "Jangan menyumbat rapat labu saat ada kenaikan suhu!",
  },
  {
    id: "penyangga-4",
    topic: "penyangga",
    stepNumber: 4,
    apparatusId: "tabung-reaksi",
    apparatusName: "Tabung Reaksi Uji Buffer",
    fbxFile: "/tabung reaksi.fbx",
    stageTitle: "4. Uji Kapasitas Penyangga vs Air",
    concept: "Membuktikan ketahanan pH buffer saat ditetesi 1 tetes HCl 0.1 M (pH tetap ~4.74 vs air anjlok ke 3).",
    formula: "Kapasitas Buffer (β) = dB / dpH (Ketahanan fluktuasi pH)",
    role: "Wadah uji komparasi perubahan warna indikator universal.",
    applications: [
      "Uji kualitatif kation dan anion",
      "Uji hidrolisis garam dan kekuatan asam",
      "Pengamatan endapan dan reaksi perubahan warna",
    ],
    sop: [
      "Beri label 'Tabung Buffer' dan 'Tabung Air Kontrol'.",
      "Tambahkan 1 tetes asam kuat, lalu goyang tabung perlahan.",
      "Cocokkan warna indikator dengan skala pH standar.",
    ],
    warning: "Jangan mengocok tabung reaksi dengan jempol telanjang!",
  },

  // ===================== UJI NYALA =====================
  {
    id: "uji-nyala-1",
    topic: "uji-nyala",
    stepNumber: 1,
    apparatusId: "tabung-reaksi",
    apparatusName: "Tabung Reaksi (HCl Pekat)",
    fbxFile: "/tabung reaksi.fbx",
    stageTitle: "1. Pelarutan Garam dalam HCl",
    concept: "Garam diubah menjadi senyawa klorida volatil dengan HCl pekat agar mudah tereksitasi di nyala api.",
    formula: "Mⁿ⁺ (dasar) + panas api → Mⁿ⁺* (tereksitasi) → Mⁿ⁺ + foton (hν)",
    role: "Wadah melarutkan sampel garam logam (Na, K, Ca, Ba, Cu).",
    applications: [
      "Uji gas hidrogen dari asam dan logam seng",
      "Identifikasi kation golongan I (Ag⁺, Pb²⁺)",
      "Uji endapan putih barium sulfat",
    ],
    sop: [
      "Gunakan tabung reaksi bersih tanpa ion pengotor.",
      "Masukkan secuil kristal garam, beri 3 tetes HCl 6 M.",
      "Letakkan tabung pada rak kayu/plastik.",
    ],
    warning: "Uap HCl pekat menyengat; gunakan di ruang berventilasi!",
  },
  {
    id: "uji-nyala-2",
    topic: "uji-nyala",
    stepNumber: 2,
    apparatusId: "kaca-arloji",
    apparatusName: "Kaca Arloji (Pencuci Kawat)",
    fbxFile: "/Kaca Arloji.fbx",
    stageTitle: "2. Pembersihan Kawat Nikrom",
    concept: "Kawat nikrom dicelupkan ke HCl pekat lalu dibakar hingga api tetap biru murni tanpa kilatan natrium.",
    formula: "λ = c / ν = h·c / ΔE (Panjang gelombang emisi)",
    role: "Cawan dangkal tempat asam pencuci kawat nikrom.",
    applications: [
      "Wadah pencampuran serbuk reaksi kontak",
      "Pengamatan visual mikroskop kristal garam",
      "Penutup bejana reaksi penguapan asam",
    ],
    sop: [
      "Tuang 1 mL HCl pekat pada cekungan kaca arloji.",
      "Celupkan kawat nikrom, bakar di zona api biru terpanas.",
      "Ulangi sampai api pembakar bersih dari warna kuning.",
    ],
    warning: "Jauhkan kaca arloji dari sentuhan langsung kawat membara!",
  },
  {
    id: "uji-nyala-3",
    topic: "uji-nyala",
    stepNumber: 3,
    apparatusId: "spatula",
    apparatusName: "Spatula Stainless Steel",
    fbxFile: "/Spatulafbx.fbx",
    stageTitle: "3. Pengambilan Mikro Kristal Garam",
    concept: "Tiap kation memancarkan warna khas: Na (kuning 589nm), K (ungu 766nm), Cu (hijau 510nm), Ba (hijau 554nm).",
    formula: "Na⁺: Kuning | K⁺: Ungu | Cu²⁺: Hijau Toska | Ba²⁺: Hijau Apel",
    role: "Mengambil seujung mikro kristal garam logam murni.",
    applications: [
      "Penambahan serbuk katalisator pada sintesis",
      "Pencuil kristal garam dari botol reagen",
      "Penyiapan sampel pelet padatan analisis FTIR",
    ],
    sop: [
      "Gunakan ujung datar (blade) spatula yang bersih.",
      "Ambil seujung jarum serbuk kristal (hindari berlebih).",
      "Lap bersih sebelum berpindah ke botol garam lain.",
    ],
    warning: "Jangan gunakan spatula berkarat atau basah!",
  },
  {
    id: "uji-nyala-4",
    topic: "uji-nyala",
    stepNumber: 4,
    apparatusId: "lemari-asam",
    apparatusName: "Lemari Asam (K3 Uji Nyala)",
    fbxFile: "/lEMARI asam2.fbx",
    stageTitle: "4. Pembakaran & Evakuasi Asap Toksik",
    concept: "Pemanasan garam BaCl₂ dan CuCl₂ pada suhu ~1500°C menghasilkan aerosol logam toksik yang wajib dihisap keluar.",
    formula: "Kecepatan hisap laminar konstan: 0.5 m/s (100 FPM)",
    role: "Area pembakaran aman dengan pembuangan uap asam dan logam.",
    applications: [
      "Destruksi asam perklorat pada sampel mineral",
      "Penguapan pelarut volatil benzena & kloroform",
      "Sintesis gas halogen klorin (Cl₂) berbahaya",
    ],
    sop: [
      "Nyalakan blower sebelum menyalakan bunsen.",
      "Atur tinggi pintu kaca (sash) sebatas dada.",
      "Gunakan kaca kobalt biru saat mengamati nyala kalium.",
    ],
    warning: "Uji nyala garam barium WAJIB di dalam lemari asam!",
  },
  {
    id: "uji-nyala-5",
    topic: "uji-nyala",
    stepNumber: 5,
    apparatusId: "corong-kaca",
    apparatusName: "Corong Kaca (Pemurnian Kristal)",
    fbxFile: "/corong kaca60mm.fbx",
    stageTitle: "5. Filtrasi Gravitasi Sampel",
    concept: "Memisahkan pengotor padat tak larut agar larutan garam menghasilkan emisi nyala yang murni dan tajam.",
    formula: "Campuran padat-cair → Filtrat murni (lolos) + Residu (tertahan)",
    role: "Menopang kertas saring kuantitatif pada penyaringan larutan.",
    applications: [
      "Penyaringan endapan perak klorida (AgCl)",
      "Pemisahan karbon aktif pada dekolorisasi larutan",
      "Pemisahan katalis heterogen dari hasil reaksi",
    ],
    sop: [
      "Lipat kertas saring kerucut pas 60 derajat.",
      "Tempelkan tangkai serong corong ke dinding gelas penampung.",
      "Tuang suspensi larutan melewati batang pengaduk.",
    ],
    warning: "Tinggi cairan tidak boleh melebihi 3/4 kertas saring!",
  },
];

export default function ScrollyChemistryLab() {
  const [activeTopic, setActiveTopic] = useState<"titrasi" | "penyangga" | "uji-nyala">("titrasi");
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);
  const [loadingModel, setLoadingModel] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const currentTopicSteps = SCROLLY_STEPS.filter((s) => s.topic === activeTopic);
  const currentStep = currentTopicSteps[activeStepIdx] || currentTopicSteps[0];

  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const currentObjectRef = useRef<THREE.Object3D | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Inisialisasi Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 440;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06112e);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 4.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 10;
    controls.minDistance = 1.2;
    controlsRef.current = controls;

    // Pencahayaan
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xe9c46a, 2.2);
    goldKeyLight.position.set(4, 7, 4);
    scene.add(goldKeyLight);

    const navyFillLight = new THREE.DirectionalLight(0x13296b, 1.6);
    navyFillLight.position.set(-4, -2, -3);
    scene.add(navyFillLight);

    const spotLight = new THREE.SpotLight(0xfff8e7, 3.8);
    spotLight.position.set(0, 6, 2);
    spotLight.angle = Math.PI / 4.2;
    spotLight.penumbra = 0.35;
    scene.add(spotLight);

    // Grid Helper
    const grid = new THREE.GridHelper(8, 16, 0xc8952c, 0x13296b);
    grid.position.y = -1.5;
    grid.material.opacity = 0.3;
    grid.material.transparent = true;
    scene.add(grid);

    let isRunning = true;
    const animate = () => {
      if (!isRunning) return;
      reqIdRef.current = requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      if (isAutoRotate && currentObjectRef.current) {
        currentObjectRef.current.rotation.y += 0.007;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 440;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isRunning = false;
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      container.innerHTML = "";
    };
  }, [isAutoRotate]);

  // Load Model FBX
  useEffect(() => {
    if (!sceneRef.current || !currentStep) return;
    const scene = sceneRef.current;
    setLoadingModel(true);

    if (currentObjectRef.current) {
      scene.remove(currentObjectRef.current);
      currentObjectRef.current = null;
    }

    const loader = new FBXLoader();
    const encodedPath = encodeURI(currentStep.fbxFile);

    loader.load(
      encodedPath,
      (fbx) => {
        const box = new THREE.Box3().setFromObject(fbx);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const targetScale = 2.8 / maxDim;
        fbx.scale.setScalar(targetScale);

        fbx.position.x = -center.x * targetScale;
        fbx.position.y = -center.y * targetScale;
        fbx.position.z = -center.z * targetScale;

        fbx.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              materials.forEach((mat) => {
                if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhongMaterial) {
                  mat.side = THREE.DoubleSide;
                  mat.wireframe = isWireframe;
                  if (mat.color && mat.color.getHex() === 0x000000) {
                    mat.color.setHex(0xd5dbe6);
                  }
                }
              });
            }
          }
        });

        const wrapper = new THREE.Group();
        wrapper.add(fbx);
        scene.add(wrapper);
        currentObjectRef.current = wrapper;
        setLoadingModel(false);

        if (cameraRef.current && controlsRef.current) {
          cameraRef.current.position.set(0, 1.2, 4.6);
          controlsRef.current.target.set(0, 0, 0);
          controlsRef.current.update();
        }
      },
      undefined,
      (err) => {
        console.warn(`FBX notice for ${currentStep.fbxFile}:`, err);
        const group = new THREE.Group();
        const beakerGeo = new THREE.CylinderGeometry(0.9, 0.8, 2.4, 32);
        const beakerMat = new THREE.MeshStandardMaterial({ color: 0x13296b, metalness: 0.3, roughness: 0.2 });
        group.add(new THREE.Mesh(beakerGeo, beakerMat));
        scene.add(group);
        currentObjectRef.current = group;
        setLoadingModel(false);
      }
    );
  }, [currentStep, isWireframe]);

  const handleTopicChange = (topic: "titrasi" | "penyangga" | "uji-nyala") => {
    setActiveTopic(topic);
    setActiveStepIdx(0);
  };

  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 1.5, 4.8);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <section id="scrolly-lab" className="py-14 bg-[#ffffff] border-b border-[#d5dbe6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section (Concise & Clear) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#eef4fb] border border-[#c8952c]/50 text-[#9a6b17] text-[11px] font-bold uppercase tracking-wider tech-font mb-2">
              <Zap className="w-3 h-3 text-[#13296b]" />
              Alur Praktikum 3D Interaktif
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#13296b] tracking-tight">
              Eksplorasi Langkah & Alat Kimia
            </h2>
          </div>

          <span className="text-xs text-[#5f6678] tech-font">
            Pilih topik & scroll kartu untuk mengganti alat 3D
          </span>
        </div>

        {/* 3 Topic Selector Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b border-[#d5dbe6] pb-3">
          <button
            onClick={() => handleTopicChange("titrasi")}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTopic === "titrasi"
                ? "bg-[#13296b] text-white border border-[#c8952c] shadow-sm"
                : "bg-[#f8fafc] text-[#1c2233] border border-[#d5dbe6] hover:border-[#c8952c]"
            }`}
          >
            <Beaker className="w-3.5 h-3.5 text-[#e9c46a]" />
            1. Titrasi Asam-Basa (4 Tahap)
          </button>

          <button
            onClick={() => handleTopicChange("penyangga")}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTopic === "penyangga"
                ? "bg-[#13296b] text-white border border-[#c8952c] shadow-sm"
                : "bg-[#f8fafc] text-[#1c2233] border border-[#d5dbe6] hover:border-[#c8952c]"
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-[#e9c46a]" />
            2. Larutan Penyangga (4 Tahap)
          </button>

          <button
            onClick={() => handleTopicChange("uji-nyala")}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTopic === "uji-nyala"
                ? "bg-[#13296b] text-white border border-[#c8952c] shadow-sm"
                : "bg-[#f8fafc] text-[#1c2233] border border-[#d5dbe6] hover:border-[#c8952c]"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#e9c46a]" />
            3. Uji Nyala Logam (5 Tahap)
          </button>
        </div>

        {/* Layout Grid: Sticky 3D + Concise Step Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative">
          {/* SISI KIRI: STICKY 3D VIEWER */}
          <div className="lg:col-span-6 lg:sticky lg:top-20 z-20">
            <div className="rounded-xl bg-[#06112e] border-2 border-[#c8952c] shadow-xl overflow-hidden">
              {/* Header Bar 3D */}
              <div className="bg-[#0b1a47] px-3.5 py-2 border-b border-[#c8952c]/30 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e9c46a] animate-pulse"></span>
                  <span className="font-bold text-[#e9c46a] tech-font uppercase text-[11px] truncate max-w-[200px]">
                    {currentStep.apparatusName}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsAutoRotate(!isAutoRotate)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      isAutoRotate ? "bg-[#c8952c] text-[#0b1a47] border-[#c8952c]" : "bg-white/10 text-white/70 border-white/20"
                    }`}
                  >
                    Rotasi: {isAutoRotate ? "ON" : "OFF"}
                  </button>
                  <button
                    onClick={() => setIsWireframe(!isWireframe)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      isWireframe ? "bg-[#c8952c] text-[#0b1a47] border-[#c8952c]" : "bg-white/10 text-white/70 border-white/20"
                    }`}
                  >
                    Wireframe
                  </button>
                  <button onClick={resetCamera} className="p-1 rounded bg-white/10 text-white hover:bg-white/20" title="Reset View">
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Three.js Canvas Container */}
              <div className="relative w-full h-[340px] sm:h-[400px] bg-[#06112e]">
                <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

                {loadingModel && (
                  <div className="absolute inset-0 bg-[#06112e]/80 flex flex-col items-center justify-center text-white z-20">
                    <div className="w-8 h-8 border-3 border-[#c8952c] border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p className="text-[11px] font-bold text-[#e9c46a] tech-font uppercase">
                      Memuat 3D: {currentStep.apparatusName}
                    </p>
                  </div>
                )}

                {/* Compact Role Callout */}
                <div className="absolute bottom-2.5 left-2.5 bg-[#0b1a47]/90 border border-[#c8952c]/40 p-2 rounded max-w-[250px] text-[10px] text-white shadow-lg pointer-events-none">
                  <span className="text-[#e9c46a] font-bold block uppercase tech-font">Peran Alat:</span>
                  <p className="text-[#eef4fb]/90 leading-tight mt-0.5">{currentStep.role}</p>
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-[#06112e]/80 border border-white/10 px-2 py-0.5 rounded text-[9px] text-white/60 pointer-events-none flex items-center gap-1">
                  <Compass className="w-2.5 h-2.5 text-[#e9c46a]" />
                  <span>Drag rotasi • Scroll zoom</span>
                </div>
              </div>

              {/* Action Bar Bawah Viewer */}
              <div className="bg-[#0b1a47] p-2.5 border-t border-[#c8952c]/30 flex items-center justify-between">
                <span className="text-[11px] text-[#eef4fb] font-medium truncate max-w-[220px]">
                  Tahap {activeStepIdx + 1}/{currentTopicSteps.length}: <strong>{currentStep.apparatusName}</strong>
                </span>

                <button
                  onClick={() => setShowModal(true)}
                  className="px-3 py-1 rounded bg-gradient-to-r from-[#9a6b17] via-[#e9c46a] to-[#c8952c] text-[#0b1a47] font-bold text-[10px] uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  Bisa Untuk Apa Saja?
                </button>
              </div>
            </div>
          </div>

          {/* SISI KANAN: KARTU LANGKAH PRAKTIKUM (CONCISE & VISUAL) */}
          <div className="lg:col-span-6 space-y-4">
            {currentTopicSteps.map((step, idx) => {
              const isActive = idx === activeStepIdx;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer relative ${
                    isActive
                      ? "bg-[#0b1a47] text-white border-2 border-[#c8952c] shadow-lg ring-1 ring-[#c8952c]/30"
                      : "bg-white text-[#1c2233] border-[#d5dbe6] hover:border-[#c8952c] hover:bg-[#f8fafc]"
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider tech-font ${
                        isActive ? "bg-[#13296b] text-[#e9c46a] border border-[#c8952c]" : "bg-[#eef4fb] text-[#13296b]"
                      }`}
                    >
                      Langkah {step.stepNumber}
                    </span>
                    <span className={`text-[11px] font-bold tech-font ${isActive ? "text-[#e9c46a]" : "text-[#9a6b17]"}`}>
                      {step.apparatusName}
                    </span>
                  </div>

                  {/* Stage Title */}
                  <h3 className={`text-base sm:text-lg font-black tracking-tight mb-2 ${isActive ? "text-white" : "text-[#13296b]"}`}>
                    {step.stageTitle}
                  </h3>

                  {/* Concept */}
                  <p className={`text-xs leading-relaxed mb-3 ${isActive ? "text-[#eef4fb]/90" : "text-[#5f6678]"}`}>
                    {step.concept}
                  </p>

                  {/* Formula Chip */}
                  {step.formula && (
                    <div
                      className={`p-2 rounded border mb-3 font-mono text-[11px] font-semibold truncate ${
                        isActive ? "bg-[#06112e] border-[#c8952c]/40 text-[#e9c46a]" : "bg-[#f8fafc] border-[#d5dbe6] text-[#13296b]"
                      }`}
                    >
                      {step.formula}
                    </div>
                  )}

                  {/* SOP Checklist (Concise Bullets) */}
                  <div className="space-y-1 mb-3">
                    <span className={`text-[10px] uppercase font-bold tracking-wider block tech-font ${isActive ? "text-[#e9c46a]" : "text-[#13296b]"}`}>
                      SOP Ringkas:
                    </span>
                    <ul className="space-y-1 text-xs">
                      {step.sop.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${isActive ? "text-[#e9c46a]" : "text-[#c8952c]"}`} />
                          <span className={isActive ? "text-white/90" : "text-[#1c2233]"}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Warning Chip */}
                  <div
                    className={`p-2 rounded text-[11px] flex items-center gap-1.5 ${
                      isActive ? "bg-red-950/50 border border-red-500/40 text-red-200" : "bg-red-50 border border-red-200 text-red-800"
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    <span><strong>K3:</strong> {step.warning}</span>
                  </div>

                  {isActive && (
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#e9c46a]">
                      <span className="font-semibold">Aktif di Panggung 3D</span>
                      <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal Wawasan Lintas Kimia */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1a47] border-2 border-[#c8952c] rounded-xl max-w-lg w-full p-6 text-white shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#c8952c]/40 pb-3 mb-4">
              <div>
                <span className="text-[10px] text-[#e9c46a] uppercase font-bold tech-font block">Aplikasi Lintas Cabang Kimia</span>
                <h3 className="text-xl font-black text-white">{currentStep.apparatusName}</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#eef4fb]/90 leading-relaxed mb-4">
              Selain di <strong>{currentStep.stageTitle.split(".")[1]}</strong>, alat ini digunakan luas pada:
            </p>

            <div className="space-y-2 mb-5">
              {currentStep.applications.map((app, i) => (
                <div key={i} className="p-2.5 rounded bg-[#06112e] border border-[#c8952c]/30 flex items-start gap-2.5 text-xs">
                  <span className="w-4 h-4 rounded-full bg-[#13296b] text-[#e9c46a] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-white/90 leading-snug">{app}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 rounded bg-gradient-to-r from-[#9a6b17] via-[#e9c46a] to-[#c8952c] text-[#0b1a47] font-bold text-xs uppercase"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
