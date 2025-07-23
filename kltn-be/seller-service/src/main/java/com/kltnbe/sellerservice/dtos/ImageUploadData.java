package com.kltnbe.sellerservice.dtos;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

@Getter
@Setter
public class ImageUploadData implements List<MultipartFile> {
    private byte[] frontImage;
    private byte[] backImage;
    private byte[] faceImage;

    @Override
    public int size() {
        return 0;
    }

    @Override
    public boolean isEmpty() {
        return false;
    }

    @Override
    public boolean contains(Object o) {
        return false;
    }

    @Override
    public Iterator<MultipartFile> iterator() {
        return null;
    }

    @Override
    public Object[] toArray() {
        return new Object[0];
    }

    @Override
    public <T> T[] toArray(T[] a) {
        return null;
    }

    @Override
    public boolean add(MultipartFile multipartFile) {
        return false;
    }

    @Override
    public boolean remove(Object o) {
        return false;
    }

    @Override
    public boolean containsAll(Collection<?> c) {
        return false;
    }

    @Override
    public boolean addAll(Collection<? extends MultipartFile> c) {
        return false;
    }

    @Override
    public boolean addAll(int index, Collection<? extends MultipartFile> c) {
        return false;
    }

    @Override
    public boolean removeAll(Collection<?> c) {
        return false;
    }

    @Override
    public boolean retainAll(Collection<?> c) {
        return false;
    }

    @Override
    public void clear() {

    }

    @Override
    public MultipartFile get(int index) {
        return null;
    }

    @Override
    public MultipartFile set(int index, MultipartFile element) {
        return null;
    }

    @Override
    public void add(int index, MultipartFile element) {

    }

    @Override
    public MultipartFile remove(int index) {
        return null;
    }

    @Override
    public int indexOf(Object o) {
        return 0;
    }

    @Override
    public int lastIndexOf(Object o) {
        return 0;
    }

    @Override
    public ListIterator<MultipartFile> listIterator() {
        return null;
    }

    @Override
    public ListIterator<MultipartFile> listIterator(int index) {
        return null;
    }

    @Override
    public List<MultipartFile> subList(int fromIndex, int toIndex) {
        return List.of();
    }
}
